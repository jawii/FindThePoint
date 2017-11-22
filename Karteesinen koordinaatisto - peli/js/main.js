/* global Phaser */

var FindPoint = FindPoint || {};

//initiate the Phaser framework
FindPoint.game = new Phaser.Game(800, 600, Phaser.AUTO);


FindPoint.game.state.add('GameState', FindPoint.GameState);
FindPoint.game.state.start('GameState');    