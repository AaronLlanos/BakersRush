'use strict';

// jshint unused: false

angular.module('app.game.controls', [])
	.directive('gameCommand', ['GameControlFactory', 'CodeMirror', function (GameControlFactory, CodeMirror) {
		return {
			templateUrl: 'scripts/game/controls/control_box.html',
			link: function (scope, iElement, iAttrs) {
				var codeMirror = CodeMirror.fromTextArea(document.getElementById('add-command'), {
								    lineNumbers: true,
								    theme: "dracula"
								  });
				scope.run = function (){
					var val, fval, resp,
						isClear, success;

					val = iElement.find('#add-command').val(); // Commands the user inputed
					fval = GameControlFactory.formatCommands(val);
 					resp = GameControlFactory.checkSyntax(fval);
 					if (resp === 'valid'){
 						scope.runCommand(fval);
 					}else{
 						scope.showError(resp);
 					}

				};
				scope.showError = function(resp){
					console.log('showing an error here');
				};
			},
			controller: function ($scope, $element) {
				// Initialize typeahead
				$scope.controls = ["up()", "down()", "left()", "right()"];
				$element.find('textarea').typeahead({source: $scope.controls});
			}
		};
	}]);