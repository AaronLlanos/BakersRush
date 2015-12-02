'use strict';

// jshint unused: false

angular.module('app.game.controls', [])
	.directive('gameCommand', ['GameControlFactory', 'CodeMirror', function (GameControlFactory, CodeMirror) {
		return {
			templateUrl: 'scripts/game/controls/control_box.html',
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

				
				scope.run = function (){
					var val, fval, resp,
						isClear, success;
					val = element.find('.CodeMirror-line');
					fval = [];
					angular.forEach(val, function (v){
						fval.push(v.innerText);
					});
					val = fval;
					fval = GameControlFactory.formatCommands(val);
 					resp = GameControlFactory.checkSyntax(fval);
 					scope.runCommand(fval);
 					
				};
				scope.showError = function(resp){
					console.log('showing an error here');
				};
			},
			controller: function ($scope, $element) {
				
			}
		};
	}]);