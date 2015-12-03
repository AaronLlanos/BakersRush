'use strict';
// jshint unused: false

angular.module('app.game')
	.factory('GameFactory', ['Phaser', 'GameStates', function (Phaser, GameStates) {
		function createGame (ele, scope, mapId){
			// Create our phaser game
			var width  = parseInt(ele.find('#gameCanvas').css('width'), 10),
				height = 375;
		
			var game = new Phaser.Game(width, height, Phaser.AUTO, 'gameCanvas');

			// Add our game states
			game.state.add('Introduction', GameStates.Introduction(game, scope));
			game.state.add('Level1', GameStates.Level1(game, scope));

			// Start the game
			game.state.start('Introduction');

			return game;
		}

		function destroyGame (game){
			game.destroy(); // Clean up the game when we leave this scope
		}
	
		return {
			createGame: createGame,
			destroyGame: destroyGame
		};
	}]);