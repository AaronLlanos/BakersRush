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
	.directive('gameCanvas', ['GameFactory', 'GameControlFactory', function (GameFactory, GameControlFactory) {

		var linkFn = function (scope, element, attrs) {};

		var controller = function ($scope, $element) {
			// Controls for Phaser from the controls module.
			var runIndex, fval, game;
			$scope.fval = fval = []; // Connect the scope variables to avoid scope soup
			$scope.runIndex = runIndex = 0; // Connect the scope variables to avoid scope soup
			$scope.game = game = {}; // Connect the scope variables to avoid scope soup
			$scope.highestLevel = 0;
			$scope.currentLevel = 0;
			$scope.soundOn = true;

			$scope.runCommand = function (commands){
				// Hmm need to figure out why I cant just put fval and need to define $scope.fval
				$scope.fval = commands.reverse(); 
				game.state.restart();
			};
			$scope.endLevel = function (){
				$scope.$broadcast('completeDirection', false);
				$scope.currentLevel += 1;
				if ($scope.currentLevel > $scope.highestLevel){
					$scope.highestLevel = $scope.currentLevel;
				}
				$scope.$broadcast('triggerTransition');
			};
			$scope.nextDirection = function (){
				$scope.$broadcast('changeDirection', runIndex);
				$scope.runIndex += 1;
			};
			$scope.completeDirection = function (error){
				$scope.$broadcast('completeDirection', error);
			};

			game = GameFactory.createGame($element, $scope, $scope.mapId);
			$scope.$on('$destroy', function() {
				GameFactory.destroyGame(game);
			});

		};

		return {
			restrict: 'A',
			scope: {
				players: '=',
				mapId: '='
			},
			templateUrl: 'templates/game/game.html',
			link: linkFn,
			controller: controller
		};
	}]);