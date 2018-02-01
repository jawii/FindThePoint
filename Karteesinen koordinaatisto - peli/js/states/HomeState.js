/* global Phaser */
var FindPoint = FindPoint || {};

FindPoint.HomeState = {
    init: function(message){
        this.message = message;
    },

    create: function(){
        // var background = this.game.add.sprite(0,0, null);
        // background.inputEnabled = true;

        //Background for this screen and game over screen
        this.backgroundColor = "#fff";
        this.game.stage.backgroundColor =  this.backgroundColor;


        var copyRigthTextStyle = {
          font: "14px aldrichregular",
          fill: "black"
        }
        var copyRightText = this.game.add.text(this.game.world.width - 80, this.game.world.height - 20, '\u00A9' + "Jaakko Kenttä", copyRigthTextStyle);          
        copyRightText.anchor.setTo(0.5);


        this.startGameTextstyle = {
            font: '30px Bungee',
            fill: '#000000'
        };
        var gameTextStyle = {
            font: '80px Bungee',
            fill: '#ff32c3'
        };
        var guideTextStyle = {
            font: '24px',
            fill: '#000000',
            align: 'center',
            wordWrap: true,
            wordWrapWidth: 400
        }
        var gameNameText = this.game.add.text(400, 120, 'Find The Point', gameTextStyle);
        gameNameText.anchor.setTo(0.5);
        gameNameText.setShadow(5, 5, 'rgba(0,0,0,0.5)', 10);

        var startGameButton = this.game.add.button(400, 450, 'button');
        startGameButton.anchor.setTo(0.5);
        startGameButton.scale.setTo(1.5);
        var startGameText =this.game.add.text(startGameButton.position.x, startGameButton.position.y, 'Start Game', this.startGameTextstyle);
        startGameText.anchor.setTo(0.5);

        // var guideTextText = 'You have 45 seconds to place as many points you can in the Cartesian coordinate grid.';
        var guideTextText = 'Laita 45 sekunnin aikana niin monta pistettä paikalleen kun ehdit.';
        var guideText = this.game.add.text(400, 300, guideTextText, guideTextStyle);
        guideText.anchor.setTo(0.5);
        guideText.font = 'Bungee'
        //guideText.setTextBounds(0, 0, 100, 100);

        startGameButton.events.onInputDown.add(function(){
            FindPoint.game.state.start('GameState');
        }, this);

        if(this.message){
            //this.state.start('GameState');
        }

    }




};