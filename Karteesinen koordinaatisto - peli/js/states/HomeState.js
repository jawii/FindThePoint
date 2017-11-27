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
        this.backgroundColor = "#646464"
        this.game.stage.backgroundColor =  this.backgroundColor;

        //this.backgroundImage = this.game.add.sprite(0, 0, 'background');
        //this.backgroundImage.height = this.game.height;
        //this.backgroundImage.width = this.game.width;
        //example image
        var exampleImage = this.game.add.sprite(this.game.world.width/2, this.game.world.height/1.4, 'example');
        exampleImage.anchor.setTo(0.5);
        exampleImage.scale.setTo(1.5);
        exampleImage.alpha = 0.9;




        background.events.onInputDown.add(function(){
            FindPoint.game.state.start('GameState');
        }, this);

        this.startGameTextstyle = {
            font: '30px Arial',
            fill: '#000000'
        };
        var gameTextStyle = {
            font: '80px Arial',
            fill: '#3e90f5'
        }
        var gameNameText = this.game.add.text(this.game.world.width/2, 80, 'Find The Point', gameTextStyle);
        gameNameText.anchor.setTo(0.5);
        gameNameText.setShadow(5, 5, 'rgba(0,0,0,0.5)', 10);

        var startGameButton = this.game.add.button(this.game.world.width/2, 175, 'button');
        startGameButton.anchor.setTo(0.5);
        startGameButton.scale.setTo(1.5);
        var startGameText =this.game.add.text(startGameButton.position.x, startGameButton.position.y, 'Start Game', this.startGameTextstyle);
        startGameText.anchor.setTo(0.5);


        startGameButton.events.onInputDown.add(function(){
            startGameButton.key = "button_pressed";
            this.game.time.events.add(3000);
            FindPoint.game.state.start('GameState');
        }, this);

        if(this.message){
            //this.state.start('GameState');
        }

    }




};