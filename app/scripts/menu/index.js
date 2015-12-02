'use strict';

angular.module('app.menu', [])
	.config(function($stateProvider) {
	  $stateProvider
	    .state('menu', {
	      url: '/menu',
	      templateUrl: 'templates/menu/menu.html',
	      controller: 'MenuCtrl as ctrl'
	    });
	});