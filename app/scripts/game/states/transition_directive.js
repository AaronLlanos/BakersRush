'use strict';

// jshint unused: false

angular.module('app.game')
	.directive('transitionModal', [function () {

		function link(scope, iElement, iAttrs) {}

		function controller($scope, $element){
			$scope.$on('triggerTransition', function(){
				$element.find('.modal').modal('show');
			});
		}

		return {
			restrict: 'A',
			link: link,
			controller: controller,
			templateUrl: 'templates/game/level_transition.html'
		};
	}]);