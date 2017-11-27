/* global Phaser */

var FindPoint = FindPoint || {};

//initiate the Phaser framework
var Presets = {
    'width': window.innerWidth < 480 ? 480 : 800,
    'height': window.innerHeight-32 < 320 ? 320 : 600
};
FindPoint.game = new Phaser.Game(Presets.width, Presets.height, Phaser.AUTO);


FindPoint.game.state.add('GameState', FindPoint.GameState);
FindPoint.game.state.add('HomeState', FindPoint.HomeState);
FindPoint.game.state.add('PreloadState', FindPoint.PreloadState);
FindPoint.game.state.add('BootState', FindPoint.BootState);

FindPoint.game.state.start('BootState');
