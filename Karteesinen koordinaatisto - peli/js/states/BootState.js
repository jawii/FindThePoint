/* global Phaser */
var FindPoint = FindPoint || {};

FindPoint.BootState = {
    init: function(){


    },
    preload: function(){
        //console.log("BootState");
        this.load.image('preloadBar', 'assets/images/bar.png');

    },
    create: function(){
        FindPoint.game.state.start('PreloadState');
    }




};