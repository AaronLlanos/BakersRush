'use strict';

// jshint unused: false

angular.module('app.game.controls', [])
	.directive('gameCommand', ['GameControlFactory', 'CodeMirror', function (GameControlFactory, CodeMirror) {
		return {
			templateUrl: 'templates/game/control_box.html',
			link: function (scope, element, iAttrs) {

				// Text editor display
				scope.editor =  CodeMirror.fromTextArea(document.getElementById('add-command'), {
								    lineNumbers: true,
								    theme: "dracula"
								});
				// Text editor autocomplete
				var orig = CodeMirror.hint.html;
				CodeMirror.hint.html = function(cm) {
					var inner =  orig(cm) || {from: cm.getCursor(), to: cm.getCursor(), list: []};
					inner.list.push("right()");
					inner.list.push("up()");
					inner.list.push("down()");
					inner.list.push("left()");
					return inner;
				};
				// Text editor Autocomplete listener
				scope.editor.on("keyup", function(cm, event) {
		            var popupKeyCodes = {
		                "9": "tab",
		                "13": "enter",
		                "27": "escape",
		                "33": "pageup",
		                "34": "pagedown",
		                "35": "end",
		                "36": "home",
		                "38": "up",
		                "40": "down"
		            };
		            if(!popupKeyCodes[(event.keyCode || event.which).toString()]) {
		                CodeMirror.showHint(cm, CodeMirror.hint.html);
		            }            
		        });

				
			},
			controller: function ($scope, $element) {
				// Placeholder for CodeMirror lines that is updated when the user hits run
				var userCodeLines;

				$scope.userCodeLines = userCodeLines = [];

				// The function that is run when the run button is clicked
				$scope.run = function (){
					var val, fval = [], resp,
						isClear, success;

					// Update user code lines now.
					userCodeLines = $element.find('.CodeMirror-line');
					$scope.runIndex = 0;

					angular.forEach(userCodeLines, function (v){
						$element.find(v).css('background-color', 'rgba(0,0,0,0)');
						fval.push(v.innerText);
					});
					val = fval;
					fval = GameControlFactory.formatCommands(val);
 					resp = GameControlFactory.checkSyntax(fval);
 					$scope.runCommand(fval);
 					
				};
				/**
				 * This function is the callback for the changeDirection listener.
				 * The purpose of this function is to highlight the current user command 
				 * being implemented in the game by the mouse. For direction completion see 
				 * function completeDirection()
				 * @return {[type]} [description]
				 */
				$scope.changeDirection = function (){
					var blue = "rgba(118,218,255,0.3)",
						line = userCodeLines[$scope.runIndex];
					$element.find(line).css("background-color", blue);
				};
				/**
				 * This function is the callback for the completeDirection listener. 
				 * This function highlights the previously completed user command implemented 
				 * by the mouse and will color the row green or red upon success or failure, respectively. 
				 * @return {[type]} [description]
				 */
				$scope.completeDirection = function (event, error){
					if ($scope.runIndex !== 0){
						var green = "rgba(74,255,71,0.3)",
							pink = "rgba(255,81,216,0.5)",
							line = userCodeLines[$scope.runIndex-1];
						if (error){
							$element.find(line).css("background-color", pink);
						}else{
							$element.find(line).css("background-color", green);
						}
					}
				};
				$scope.$on('changeDirection', $scope.changeDirection);
				$scope.$on('completeDirection', $scope.completeDirection);
			}
		};
	}]);