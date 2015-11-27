'use strict';

angular.module('app.game')

	/**
	 * This controller controls everything seen on the users screen when starting a new game. 
	 * Here the game manager is defined and will constantly oversee level completion, acheivements.
	 */
	.controller('GameCtrl', ['$scope', function ($scope) {
		var manager;
		
		$scope.management = manager = {};
		manager.foodCollected = 0;
		manager.foodOnBoard = function (){
			return;
		};
		
	}]);
