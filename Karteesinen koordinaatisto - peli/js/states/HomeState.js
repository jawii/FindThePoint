/* global Phaser */
var FindPoint = FindPoint || {};

FindPoint.HomeState = {
    init: function(message){
        this.message = message;
    },

    create: function(){
        var background = this.game.add.sprite(0,0, null);
        background.inputEnabled = true;

        //Background for this screen and game over screen
        this.backgroundColor = "#f9f6ff"
        this.game.stage.backgroundColor =  this.backgroundColor;

        var backgroundImage = this.game.add.sprite(0, 0, 'background');
        backgroundImage.height = this.game.height;
        backgroundImage.width = this.game.width;
        backgroundImage.alpha = 0.6;

        //this.backgroundImage = this.game.add.sprite(0, 0, 'background');
        //this.backgroundImage.height = this.game.height;
        //this.backgroundImage.width = this.game.width;
        //example image
        //var exampleImage = this.game.add.sprite(this.game.world.width/2, this.game.world.height/1.4, 'example');
        //exampleImage.anchor.setTo(0.5);
        //exampleImage.scale.setTo(1.0);
        //exampleImage.alpha = 0.9; 
        this.game.add.text()



        background.events.onInputDown.add(function(){
            FindPoint.game.state.start('GameState');
        }, this);

        this.startGameTextstyle = {
            font: '30px Arial',
            fill: '#000000'
        };
        var gameTextStyle = {
            font: '80px Arial',
            fill: '#ff32c3'
        };
        var guideTextStyle = {
            font: 'bold 24px Arial',
            fill: '#000000',
            align: 'center',
            wordWrap: true,
            wordWrapWidth: 300
        }
        var gameNameText = this.game.add.text(this.game.world.width/2, 120, 'Find The Point', gameTextStyle);
        gameNameText.anchor.setTo(0.5);
        gameNameText.setShadow(5, 5, 'rgba(0,0,0,0.5)', 10);

        var startGameButton = this.game.add.button(this.game.world.width/2, this.game.world.height/2, 'button');
        startGameButton.anchor.setTo(0.5);
        startGameButton.scale.setTo(1.5);
        var startGameText =this.game.add.text(startGameButton.position.x, startGameButton.position.y, 'Start Game', this.startGameTextstyle);
        startGameText.anchor.setTo(0.5);

        var guideTextText = 'You have 30 seconds to place as many points you can in the Cartesian coordinate grid.';
        var guideText = this.game.add.text(this.game.world.width/1.2, this.game.world.height/1.2, guideTextText, guideTextStyle);
        guideText.anchor.setTo(0.5);
        //guideText.setTextBounds(0, 0, 100, 100);

        startGameButton.events.onInputDown.add(function(){
            FindPoint.game.state.start('GameState');
        }, this);

        if(this.message){
            //this.state.start('GameState');
        }

    }




};