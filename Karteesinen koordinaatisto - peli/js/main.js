/* global Phaser */

var FindPoint = FindPoint || {};

//initiate the Phaser framework
FindPoint.game = new Phaser.Game('100%', '100%', Phaser.AUTO);


FindPoint.game.state.add('GameState', FindPoint.GameState);
FindPoint.game.state.start('GameState');    