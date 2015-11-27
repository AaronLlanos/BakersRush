'use strict';

// jshint unused: false

angular.module('app.game.controls', [])
	.directive('gameCommand', ['GameControlFactory', 'hljs', function (GameControlFactory, hljs) {
		return {
			templateUrl: 'scripts/game/controls/control_box.html',
			link: function (scope, iElement, iAttrs) {
				scope.showError = function(resp){
					console.log('showing an error here');
				};
				iElement.find('textarea.code').on('change', function (){
					// hljs.highlightBlock(this);
				});

			},
			controller: function ($scope, $element) {

				$scope.controls = ["up()", "down()", "left()", "right()"];
				// Initialize typeahead
				$element.find('textarea').typeahead({source: $scope.controls});

				$scope.run = function (){
					var val, fval, resp;

					val = $element.find('#add-command').val(); // Commands the user inputed
					fval = GameControlFactory.formatCommands(val);
 					resp = GameControlFactory.checkSyntax(fval);
 					if (resp === 'valid'){
 						$scope.$emit('run_controls', fval);
 					}else{
 						$scope.showError(resp);
 					}

				};
			}
		};
	}]);