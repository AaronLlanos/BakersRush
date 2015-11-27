'use strict';

angular.module('app.menu', [])
	.config(function($stateProvider) {
	  $stateProvider
	    .state('menu', {
	      url: '/menu',
	      templateUrl: 'scripts/menu/menu.html',
	      controller: 'MenuCtrl as ctrl'
	    });
	});