'use strict';

// jshint unused: false

angular.module('app.game')
	/**
	 * While ambiguous, the gameCanvas directive encompasses the entire game container. 
	 *
	 * Controls: the controls of this module should reflect only the controls for the command_box to communicate
	 * 			to Phaser
	 * 
	 */
	.directive('gameCanvas', ['GameFactory', 'GameControlFactory', '$log', '$timeout', function (GameFactory, GameControlFactory, $log, $timeout) {

		var linkFn = function (scope, ele, attrs) {
			scope.fval = [];
			scope.game = GameFactory.createGame(ele, scope, scope.mapId);
			scope.$on('$destroy', function() {
				// $log.log('destroy!');
				GameFactory.destroyGame(scope.game);
			});
			scope.endLevel = function (){
				console.log('end level!');
			};
			scope.nextDirection = function (){
				console.log('next platform!');
			};
			scope.runCommand = function (commands){
				scope.fval = commands.reverse();
				scope.game.state.restart();
			};
		};

		var controller = function ($scope, $element) {
			// Controls for Phaser from the controls module.
			
			
		};

		return {
			restrict: 'A',
			scope: {
				players: '=',
				mapId: '='
			},
			templateUrl: 'scripts/game/game.html',
			link: linkFn,
			controller: controller
		};
	}]);