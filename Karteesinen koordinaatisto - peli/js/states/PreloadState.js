/* global Phaser */
var FindPoint = FindPoint || {};

FindPoint.PreloadState = {
    init: function(){

    },
    preload: function(){

    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadBar');
    this.preloadBar.anchor.setTo(0.5);
    this.load.setPreloadSprite(this.preloadBar);

    //load images
    this.game.load.image('pointcircle_blue', 'assets/images/pointcircle_blue.png');
    this.game.load.image('pointcircle_green', 'assets/images/pointcircle_green.png');
    this.game.load.image('pointcircle_red', 'assets/images/pointcircle_red.png');
    this.game.load.image('pointparticle', 'assets/images/pointparticle.png');
    this.game.load.image('pointparticle_green', 'assets/images/pointparticle_green.png');
    this.game.load.image('example', 'assets/images/example.png');
    this.game.load.image('background', 'assets/images/background_coordinate.png');


    //http://www.kenney.nl/assets/ui-pack-rpg-expansion
    this.game.load.image('button_pressed', 'assets/images/buttonLong_blue_pressed.png');
    this.game.load.image('button', 'assets/images/buttonLong_blue.png');

    //background
    //this.game.load.image("background", 'assets/images/background.jpg');

    },
    create: function(){
        FindPoint.game.state.start('HomeState');
    }




};