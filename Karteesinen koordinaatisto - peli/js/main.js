/* global Phaser */

var FindPoint = FindPoint || {};

//initiate the Phaser framework
FindPoint.game = new Phaser.Game('100%', '100%', Phaser.AUTO);



FindPoint.game.state.add('GameState', FindPoint.GameState);
FindPoint.game.state.add('HomeState', FindPoint.HomeState);
FindPoint.game.state.add('PreloadState', FindPoint.PreloadState);
FindPoint.game.state.add('BootState', FindPoint.BootState);

FindPoint.game.state.start('BootState');
