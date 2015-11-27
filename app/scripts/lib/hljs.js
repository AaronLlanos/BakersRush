'use strict';

angular.module('hljs', [])
	.factory('hljs', ['$window', function ($window) {
		// Delete hljs from window so it's not globally accessible.
     	// We can still get at it through _thirdParty however, more on why later
     	$window._thirdParty = $window._thirdParty || {};
     	$window._thirdParty.hljs = $window.hljs;
     	try { 
     		delete $window.hljs;
     	} catch (e) {
     		$window.hljs = undefined;
     		/*<IE8 doesn't do delete of window vars, make undefined if delete error*/
     	}
    
		return $window._thirdParty.hljs;
	}]);