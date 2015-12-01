'use strict';

angular.module('CodeMirror', [])
	.factory('CodeMirror', ['$window', function ($window) {
		// Delete CodeMirror from window so it's not globally accessible.
     	// We can still get at it through _thirdParty however, more on why later
     	$window._thirdParty = $window._thirdParty || {};
     	$window._thirdParty.CodeMirror = $window.CodeMirror;
     	try { 
     		delete $window.CodeMirror;
     	} catch (e) {
     		$window.CodeMirror = undefined;
     		/*<IE8 doesn't do delete of window vars, make undefined if delete error*/
     	}
    
		return $window._thirdParty.CodeMirror;
	}]);