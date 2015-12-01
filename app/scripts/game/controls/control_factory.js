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
			var success = 'valid';

			return success;
		}

		/**
		 * [formatCommands description]
		 * @param  string 	val [description]
		 * @return array     	[description]
		 */
		function formatCommands (val){
			var v, f, a, s, fval = [];
			val = val.split("\n");
			angular.forEach(val, function (v){
				v = v.trim();
				s = v.split("(");
				f = s[0].trim();
				a = s[1].split(")")[0].trim();
				fval.push({val: v, func: f, args: a});
			});
 			return fval;
		}
	
		return {
			formatCommands: formatCommands,
			checkSyntax: checkSyntax
		};
	}]);