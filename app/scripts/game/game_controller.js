'use strict';

angular.module('app.game')

	/**
	 * This controller controls everything seen on the users screen when starting a new game. 
	 * Here the game manager is defined and will constantly oversee level completion, acheivements.
	 */
	.controller('GameCtrl', ['$scope', function ($scope) {
		$scope.highestLevel = 0;
		$scope.currentLevel = 0;
		
	}]);
