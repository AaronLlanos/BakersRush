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

		var linkFn = function (scope, ele, attrs) {
			scope.game = GameFactory.createGame(ele, scope, scope.mapId);
			scope.$on('$destroy', function() {
				GameFactory.destroyGame(scope.game);
			});
		};

		var controller = function ($scope, $element) {
			// Controls for Phaser from the controls module.
			$scope.$on('run_controls', function (event, fval){
				var state = $scope.game.state.getCurrentState(),
					runFunc;
				// console.log(state);
				angular.forEach(fval, function (o, i){
					runFunc = state.runUserCommand(o.func);
				});
			});	
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