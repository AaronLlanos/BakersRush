'use strict';

angular.module('phaser', [])
	.factory('Phaser', ['$window', function ($window) {
		// Delete phaser from window so it's not globally accessible.
     	// We can still get at it through _thirdParty however, more on why later
     	$window._thirdParty = $window._thirdParty || {};
     	$window._thirdParty.Phaser = $window.Phaser;
     	try { 
     		delete $window.Phaser;
     	} catch (e) {
     		$window.Phaser = undefined;
     		/*<IE8 doesn't do delete of window vars, make undefined if delete error*/
     	}
    
		return $window._thirdParty.Phaser;
	}]);