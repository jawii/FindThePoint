/* global Phaser */
var FindPoint = FindPoint || {};

FindPoint.GameState = {

  //initiate game settings
  init: function() {

    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.origo = [this.game.width/2, this.game.height/2];
    
    //Line style
    this.coordLineWidth = 0.5;
    this.coordLineColor = 'gray';
    this.coordLineAlpha = 0.8;
      
    //Axis style
    this.axLineWidth = 3;
    this.axLineColor = 'black';
    this.axLineAlpha = 0.5;

    //Axis number style
     this.axNumStyle = {
         font: "bold 18px Arial"
        };

    //Axis number offset
    this.xaxisNumberOffsetX = -7;
    this.xaxisNumberOffsetY = 5;
    this.yaxisNumberOffsetX = 7;
    this.yaxisNumberOffsetY = -7;
      
    //Point Style
    this.pointCircleColor = 0xFF0000;
    this.pointCircleDiameter = 10;
    this.styleAx = {
        font: "20pt Arial",
        fill: "red"
    }
      
    //coordinate grid
    this.COORD_YWIDTH = 6;
    var helperValue = Math.floor(this.COORD_YWIDTH * this.game.width / this.game.height);
    this.COORD_XWIDTH = Math.min(helperValue, 16);
      
    //group of points
    this.pointsGroup = [];
    this.pointsGroupPX = [];




  },

  //load the game assets before the game starts
  preload: function() {
    this.game.stage.backgroundColor = '#f9f6ff';

    this.graphics = this.game.add.graphics();
      
    //Group of points
    for (var x =- this.COORD_XWIDTH + 1; x < this.COORD_XWIDTH; x++){
        for (var y=-this.COORD_YWIDTH + 1; y<this.COORD_YWIDTH; y++){
                //console.log([x, y]);
                this.pointsGroup.push([x,y]);
        }
    }
    //create pointsGroupPX 
    var pointsGroupPXs = []
    this.pointsGroup.forEach(function(element){
       pointsGroupPXs.push(this.returnPoint(element[0], element[1])); 
    }, this);
    this.pointsGroupPX = pointsGroupPXs
      
    //draw coordinates
    this.drawCoordinateSystem();

    //first point
    this.nearestPoint = [];
    this.randPoint = this.pickRandomPoint();
    this.pointText = this.game.add.text(30, this.game.world.centerY/3, 'Place point to (' + this.randPoint + ")", null);

    //mouse
    this.pointSelected = false;
    this.mouseUp = true;

    //when mouse pressed, get the nearest point and place point there
    //check also if placed point = random point
    this.game.input.onDown.add(function() {
        console.log("PUSH!!")
        this.nearestPoint = this.getNearestPoint(FindPoint.game.input.x, FindPoint.game.input.y);
        this.placePoint(this.nearestPoint[0], this.nearestPoint[1]);

         if(this.randPoint === this.nearestPoint){
             console.log("YOU FOUND IT!")
         }
         else{
             console.log("wrong...")
         }
         this.randPoint = this.pickRandomPoint();
         console.log("RandomPoint: " + this.randPoint);
         this.pointText.destroy();
         this.pointText = this.game.add.text(30, this.game.world.centerY/3, 'Place point to (' + this.randPoint + ")", null);

    }, this);


  },
  
  //executed after everything is loaded
  create: function() {

  },

  update: function() {

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
    this.game.add.text(arrowPlaceX[0] - 20, arrowPlaceX[1], "x", this.styleAx);
    this.game.add.text(arrowPlaceY[0] + 20 , arrowPlaceY[1], "y", this.styleAx);
      
    //number of axis
    // käy kaikki pisteet läpi pistejoukosta missä x tai y = 0 ja laita numerot;
    this.pointsGroup.forEach(function(element) {
        //x-akseli
        var xy
        if(element[1] === 0){
           //console.log(element);
           xy = this.returnPoint(element[0], element[1]);
           //console.log(xy)
           this.game.add.text(xy[0] + this.xaxisNumberOffsetX, xy[1] + this.xaxisNumberOffsetY, element[0], this.axNumStyle)
        }
        if(element[0] === 0 && element[1] !== 0){
           //console.log(element);
           xy = this.returnPoint(element[0], element[1]);
           //console.log(xy)
           this.game.add.text(xy[0] + this.yaxisNumberOffsetX, xy[1] + this.yaxisNumberOffsetY, element[1], this.axNumStyle)
           }
        }, this);    
  },
  //returns [x,y] - coordinates of real pixelpoints
  returnPoint: function(xCord, yCord){
            var x = this.origo[0] + xCord * (this.game.width / (2 * this.COORD_XWIDTH));
            var y = this.origo[1] - yCord * (this.game.height / (2 * this.COORD_YWIDTH));     
            return [x,y];
  },
  //Place Point to x,y point
  placePoint: function(xCord, yCord) {
            var x5 = this.origo[0] + xCord * (this.game.width / (2 * this.COORD_XWIDTH));
            var y5 = this.origo[1] - yCord * (this.game.height/ (2 * this.COORD_YWIDTH)); 
            this.graphics.moveTo(x5,y5);
            this.graphics.beginFill(this.pointCircleColor);
            this.graphics.drawCircle(x5, y5, this.pointCircleDiameter);
            //this.graphics.endFill();
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
  }

};