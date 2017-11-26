/* global Phaser */
var FindPoint = FindPoint || {};

FindPoint.HomeState = {
    init: function(message){
        this.message = message;
    },

    create: function(){
        var background = this.game.add.sprite(0,0, null);
        background.inputEnabled = true;

        //Background
        this.game.stage.backgroundColor = "#4488AA";

        //example image
        var exampleImage = this.game.add.sprite(this.game.world.width/2, this.game.world.height/2, 'example');
        exampleImage.anchor.setTo(0.5);


        background.events.onInputDown.add(function(){
            FindPoint.game.state.start('GameState');
        }, this);

        var startGameTextstyle = {
            font: '34px Arial',
            fill: '#fff'
        };
        var gameTextStyle = {
            font: '60px Arial',
            fill: '#251b1b'
        }
        var gameNameText = this.game.add.text(this.game.world.width/2, this.game.world.height/12, 'Find The Point', gameTextStyle);
        gameNameText.anchor.setTo(0.5);
        //var startGameText =this.game.add.text(this.game.world.width/2, this.game.world.height/5, 'Start Game', startGameTextstyle);
        //startGameText.anchor.setTo(0.5);
        //startGameText.inputEnabled = true;
        var startGameButton = this.game.add.button(this.game.world.width/2, this.game.world.height/5)

        startGameText.events.onInputDown.add(function(){
            FindPoint.game.state.start('GameState');
        }, this);

        if(this.message){
            //this.state.start('GameState');
        }

    }




};