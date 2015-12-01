'use strict';

// jshint unused: false

angular.module('app.game.controls', [])
	.directive('gameCommand', ['GameControlFactory', 'hljs', function (GameControlFactory, hljs) {
		return {
			templateUrl: 'scripts/game/controls/control_box.html',
			link: function (scope, iElement, iAttrs) {
				
				scope.run = function (){
					var val, fval, resp,
						isClear, success;

					val = iElement.find('#add-command').val(); // Commands the user inputed
					fval = GameControlFactory.formatCommands(val);
 					resp = GameControlFactory.checkSyntax(fval);
 					if (resp === 'valid'){
 						// scope.$emit('run_controls', fval);
 						// One by one pass the controls to the parent scope (game) and wait for the response. 
 						// success = true;
 						// angular.forEach(fval, function(v){
 						// 	// console.log(v);
 						// 	if (success === true){
 						// 		isClear = scope.runCommand(v.func);
 						// 		// console.log(isClear);
	 					// 		if (isClear === false){
	 					// 			success = false;
	 					// 		}
 						// 	}
 						// });
 						scope.runCommand(fval);
 					}else{
 						scope.showError(resp);
 					}

				};
				scope.showError = function(resp){
					console.log('showing an error here');
				};
				// iElement.find('textarea.code').on('change', function (){
				// 	hljs.highlightBlock(this);
				// });

			},
			controller: function ($scope, $element) {
				// Initialize typeahead
				$scope.controls = ["up()", "down()", "left()", "right()"];
				$element.find('textarea').typeahead({source: $scope.controls});
			}
		};
	}]);