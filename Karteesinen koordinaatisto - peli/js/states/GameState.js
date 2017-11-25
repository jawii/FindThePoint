/* global Phaser */
var FindPoint = FindPoint || {};

FindPoint.GameState = {

  //initiate game settings
  init: function() {

    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.origo = [this.game.world.width/2 , this.game.world.height/2];
    //Line style
    this.coordLineWidth = 0.4;
    this.coordLineColor = 'gray';
    this.coordLineAlpha = 0.4;
    //Axis style
    this.axLineWidth = 3;
    this.axLineColor = 'black';
    this.axLineAlpha = 0.5;
    //Axis number style
     this.axNumStyle = {
         font: "bold 18px Arial"
        };

     //text-style for texts (not axis numbers)
     this.textStyle = {
         font: "24px Arial",
         fill: "#000000",
         align: "center" };

    //Axis number offset
    this.xaxisNumberOffsetX = -7;
    this.xaxisNumberOffsetY = 5;
    this.yaxisNumberOffsetX = 7;
    this.yaxisNumberOffsetY = -7;

    this.axisNumberGroup = this.game.add.group();
    this.axisLetterGroup = this.game.add.group();

    //Points scale
    this.POINTSCALE = 0.4;
    //coordinate grid
    this.COORD_YWIDTH = 6;
    var helperValue = Math.floor(this.COORD_YWIDTH * this.game.width / this.game.height);
    this.COORD_XWIDTH = Math.min(helperValue, 16);
    //group of points
    this.pointsGroup = [];
    this.pointsGroupPX = [];
    //placed points
    this.placedPoints = this.add.group();
    this.score = 0;

    //score text
    this.placePointTextPosition = {
        x: 30,
        y: this.game.world.height/11
    };
    //counter text
    this.timerTextPosition = {
        x: this.game.world.width / 1.5,
        y: this.game.world.height/11
    };

    this.gameOn = true;

    //counter text
    this.TIMER = 5;
    //this.counter = 0;
    //this.counterText =  this.game.add.text(this.counterTextPosition.x, this.counterTextPosition.y, 'Time left: ' + (this.TIMER - this.counter), this.textStyle);
    this.timerText = this.game.add.text(this.timerTextPosition.x, this.timerTextPosition.y, "Hello", this.textStyle);
  },
  //load the game assets before the game starts
  preload: function() {
    //load images
    this.game.load.image('pointcircle_blue', 'assets/images/pointcircle_blue.png');
    this.game.load.image('pointcircle_green', 'assets/images/pointcircle_green.png');
    this.game.load.image('pointcircle_red', 'assets/images/pointcircle_red.png');
    this.game.load.image('pointparticle', 'assets/images/pointparticle.png');

    this.graphics = this.game.add.graphics();
    //Group of points
    for (var x =- this.COORD_XWIDTH + 1; x < this.COORD_XWIDTH; x++){
        for (var y=-this.COORD_YWIDTH + 1; y<this.COORD_YWIDTH; y++){
                //console.log([x, y]);
                this.pointsGroup.push([x,y]);
        }
    }
    //create pointsGroupPX 
    var pointsGroupPXs = [];
    this.pointsGroup.forEach(function(element){
       pointsGroupPXs.push(this.returnPoint(element[0], element[1])); 
    }, this);
    this.pointsGroupPX = pointsGroupPXs

    //first point
    this.nearestPoint = [];
    this.randPoint = this.pickRandomPoint();
    this.pointText = this.game.add.text(this.placePointTextPosition.x, this.placePointTextPosition.y, 'Place point to (' + this.randPoint + ")", this.textStyle);
    //this.updateScore = this.game.add.text(this.scoreTextPosition.x, this.scoreTextPosition.y, 'Score:' + this.score);


    //when mouse pressed, get the nearest point and place point there
    //check also if placed point = random point
    this.game.input.onDown.add(function() {
        if(this.gameOn) {
            this.nearestPoint = this.getNearestPoint(FindPoint.game.input.x, FindPoint.game.input.y);
            var placedSprite = this.placePoint(this.nearestPoint[0], this.nearestPoint[1]);

            if (this.randPoint === this.nearestPoint) {
                console.log("YOU FOUND IT!");
                placedSprite.loadTexture('pointcircle_green');
                this.pointCorrect(placedSprite);
                this.score += 1;
                //turn point to green animation and keep green

            }
            else {
                //turn point red and boom
                this.pointInCorrect(placedSprite);
                placedSprite.loadTexture('pointcircle_red');

            }
            this.randPoint = this.pickRandomPoint();
            console.log("RandomPoint: " + this.randPoint);
            this.pointText.destroy();
            this.pointText = this.game.add.text(this.placePointTextPosition.x, this.placePointTextPosition.y, 'Place point to (' + this.randPoint + ")", this.textStyle);
            //this.updateScore.destroy();
            //this.updateScore = this.game.add.text(this.scoreTextPosition.x, this.scoreTextPosition.y, 'Score:' + this.score);
        }
    }, this);


  },
  
  //executed after everything is loaded
  create: function() {

      //start physics
      this.game.physics.startSystem(Phaser.Physics.ARCADE);

      this.game.stage.backgroundColor = '#f9f6ff';
      //draw coordinates
      this.drawCoordinateSystem();

      //create timer
      this.timer = this.game.time.create()
      this.timerEvent = this.timer.add(Phaser.Timer.SECOND * this.TIMER, this.endTimer, this);
      this.timer.start();


  },

  update: function() {
      //check if time left
      if (this.timer.running) {
          this.timerText.destroy();
          this.timerText = this.game.add.text(this.timerTextPosition.x, this.timerTextPosition.y, "Time left: " + Math.ceil((this.TIMER * 1000 - (this.timer.ms)) / 1000), this.textStyle);
      }
      else {

          this.gameOn = false;
          this.gameOver();

      }

  },
  //draws line
  drawLine: function(point1, point2, linewidth, linecolor, alpha) {
    //this.graphics.beginFill(0xFF3300);
    this.graphics.lineStyle(linewidth, linecolor, alpha);
    this.graphics.moveTo(point1[0], point1[1]);
    this.graphics.lineTo(point2[0], point2[1]);
    this.graphics.endFill();
  },
  //draws coordinate grid
  drawCoordinateSystem: function(){
    
    //vaakaviivat
    var newHeight = this.game.height / (2 * this.COORD_YWIDTH);
    
    var x1, y1, x2, y2
    for (var i = 0 ; i < 2 * this.COORD_YWIDTH ; i++){
      x1 = 0;
      y1 = newHeight * i;
      x2 = this.game.width;
      y2 = newHeight * i;
      //console.log("Starting point: " + [x1, y1] + "and finish: " + [x2, y2]);
      this.drawLine([x1, y1], [x2, y2], this.coordLineWidth, this.coordLineColor, this.coordLineAlpha);
        }
    //pystyviivat
    var newWidth = this.game.width / (2* this.COORD_XWIDTH);
    for (i = 0 ; i < 2 * this.COORD_XWIDTH ; i ++){
        x1 = newWidth * i;
        y1 = 0;
        x2 = newWidth * i;
        y2 = this.game.height;
        this.drawLine([x1, y1], [x2, y2], this.coordLineWidth, this.coordLineColor, this.coordLineAlpha);
        }
      
    //axis
    this.graphics.lineStyle(5, 0xff0000, 5);
    this.drawLine([0, this.game.height/2], [this.game.width, this.game.height/2], this.axLineWidth, this.axLineColor, this.axLineAlpha);
    this.drawLine([this.game.width/2, 0], [this.game.width/2, this.game.height], this.axLineWidth, this.axLineColor, this.axLineAlpha);
      
    //arrows
    var arrowPlaceX = [this.game.width, this.game.height/2]
    var arrowPlaceY = [this.game.width/2, 0]

    this.drawLine(arrowPlaceX, [arrowPlaceX[0] - 8, arrowPlaceX[1] - 6], 2);
    this.drawLine(arrowPlaceX, [arrowPlaceX[0] - 8, arrowPlaceX[1] + 6], 2);

    this.drawLine(arrowPlaceY, [arrowPlaceY[0] + 6, arrowPlaceY[1] + 8], 2);
    this.drawLine(arrowPlaceY, [arrowPlaceY[0] - 6, arrowPlaceY[1] + 8], 2);

    //axis name
    var xAxis = this.game.add.text(arrowPlaceX[0] - 20, arrowPlaceX[1], "x", this.styleAx);
    var yAxis = this.game.add.text(arrowPlaceY[0] + 20 , arrowPlaceY[1], "y", this.styleAx);
    this.axisLetterGroup.add(xAxis);
    this.axisLetterGroup.add(yAxis);
      
    //number of axis
    // käy kaikki pisteet läpi pistejoukosta missä x tai y = 0 ja laita numerot;
    this.pointsGroup.forEach(function(element) {
        //x-akseli
        var xy
        if(element[1] === 0){
           //console.log(element);
           xy = this.returnPoint(element[0], element[1]);
           //console.log(xy)
           var xNumber = this.game.add.text(xy[0] + this.xaxisNumberOffsetX, xy[1] + this.xaxisNumberOffsetY, element[0], this.axNumStyle);
           this.axisNumberGroup.add(xNumber)
        }
        if(element[0] === 0 && element[1] !== 0){
           //console.log(element);
           xy = this.returnPoint(element[0], element[1]);
           //console.log(xy)
           var yNumber = this.game.add.text(xy[0] + this.yaxisNumberOffsetX, xy[1] + this.yaxisNumberOffsetY, element[1], this.axNumStyle);
            this.axisNumberGroup.add(yNumber)
           }
        }, this);    
  },
  //returns [x,y] - coordinates of real pixelpoints
  returnPoint: function(xCord, yCord){
            var x = this.origo[0] + xCord * (this.game.width / (2 * this.COORD_XWIDTH));
            var y = this.origo[1] - yCord * (this.game.height / (2 * this.COORD_YWIDTH));     
            return [x,y];
  },
  //Place Point to x,y point and returns the points sprite
  placePoint: function(xCord, yCord) {
            var x5 = this.origo[0] + xCord * (this.game.width / (2 * this.COORD_XWIDTH));
            var y5 = this.origo[1] - yCord * (this.game.height/ (2 * this.COORD_YWIDTH)); 
            var circle = this.game.add.sprite(x5, y5, 'pointcircle_blue');
            this.placedPoints.add(circle);
            circle.anchor.setTo(0.5);
            circle.scale.setTo(this.POINTSCALE);
            return circle;
   },
  //take the nearest point
  getNearestPoint: function(x, y){
  //search what is nearest point for variables
      var point;
      var minDistance = 1000000;
      this.pointsGroupPX.forEach(function(element, index){     
          var distance = Math.sqrt(Math.pow(element[0] - x,2) + Math.pow(element[1] - y,2));
          if(distance <= minDistance){
              minDistance = distance
              point = this.pointsGroup[index] 
          }
      }, this);
      return point;
  },
  pickRandomPoint: function(){
      //picks random point of pointsGroup
      return this.pointsGroup[Math.floor(Math.random() * this.pointsGroup.length )];
  },
  //blow the sprite
  pointInCorrect: function(sprite){
      //console.log("BOooom!");
      tween = this.game.add.tween(sprite.scale).to({x: 0.7, y: 0.7}, 500);
      tweenNorm = this.game.add.tween(sprite.scale).to({x: 0.5, y: 0.5}, 200);
      tween.chain(tweenNorm);
      tween.start();
      //destroy sprite
      tweenNorm.onComplete.add(function(){
          emitter = this.game.add.emitter(sprite.x, sprite.y, 300);
          emitter.makeParticles('pointparticle');
          //emitter.gravity = 20;
          emitter.setXSpeed(-200, 200);
          emitter.setYSpeed(-200, 200);
          emitter.start(true, 2000, null, 100);
          sprite.destroy();
      }, this);

  },
  pointCorrect: function(sprite){
      tween = this.game.add.tween(sprite.scale).to({x: 0.7, y: 0.7}, 500);
      tweenNorm = this.game.add.tween(sprite.scale).to({x: 0.5, y: 0.5}, 200);
      tween.chain(tweenNorm);
      tween.start();
  },

  render: function (){
      //this.game.debug.geom(this.firstCircle, 'red')

  },
  endTimer: function(){
      this.timer.stop();
  },
  gameOver: function(){
      //console.log("Game Over!")
      //removeTexts
      this.pointText.destroy();
      this.timerText.destroy();
      //remove coordinategrid
      this.graphics.clear();
      this.axisNumberGroup.destroy();
      this.axisLetterGroup.destroy();
      //collect all green points and make the score


  }


};