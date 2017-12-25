/* global Phaser */
var FindPoint = FindPoint || {};

FindPoint.BootState = {
    init: function(){


    },
    preload: function(){
        //console.log("BootState");
        //scaling options
        this.mobile = !this.game.device.desktop ? true : false;

        if(this.mobile){
          this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        }
        this.load.image('preloadBar', 'assets/images/bar.png');

        //keep running on background
        this.game.stage.disableVisibilityChange = true;


        FindPoint.game.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        //FindPoint.game.scale.minWidth = 480;
        //FindPoint.game.scale.minHeight = 260;
        //FindPoint.game.scale.maxWidth = 1024;
        //FindPoint.game.scale.maxHeight = 768;
        FindPoint.game.scale.pageAlignHorizontally = true;
        FindPoint.game.scale.pageAlignVertically = true;
        FindPoint.game.scale.refresh();


    },
    create: function(){
        FindPoint.game.state.start('PreloadState');
    }




};