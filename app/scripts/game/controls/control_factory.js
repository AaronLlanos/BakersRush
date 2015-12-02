'use strict';

angular.module('app.game.controls')
	.factory('GameControlFactory', [ function () {
		
		/**
		 * Checks to make sure that functions are proper, have only one
		 * command per line, functions end with a set of parentheses and semicolon.
		 * @param  string|null 	val 	user input from the control box.
		 * @return string         		string: 'valid' or error message.
		 */
		function checkSyntax (fval) {
			function commands (func){
				if (func === "right" || func === "left" || func === "up" || func === "down") {
					return true;
				}else {
					return false;
				}
			}
			angular.forEach(fval, function(v){
				v.correctSyntax = commands(v.func);
			});
			// console.log(fval);
			return fval;
		}

		/**
		 * [formatCommands description]
		 * @param  string 	val [description]
		 * @return array     	[description]
		 */
		function formatCommands (val){
			var v, f, a, s, fval = [];
			// console.log(val);
			angular.forEach(val, function (v){
				if (v.indexOf("(") >= 0 && v.indexOf(")") >= 0){
					v = v.trim();
					s = v.split("(");
					f = s[0].trim();
					a = s[1].split(")")[0].trim();
					fval.push({val: v, func: f, args: a});
				}
			});
 			return fval;
		}
	
		return {
			formatCommands: formatCommands,
			checkSyntax: checkSyntax
		};
	}]);