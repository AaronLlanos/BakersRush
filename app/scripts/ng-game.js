'use strict';

/**
 * @ngdoc overview
 * @name app
 * @description
 * # app
 *
 * Main module of the application.
 */
angular.module('app', [
    'phaser',
    'hljs',
    'ui.router',
    'app.menu',
    'app.game',
    'app.game.controls'
  ])
	.config(['$urlRouterProvider', function ($urlRouterProvider) {
		$urlRouterProvider.otherwise('/menu');
	}]);
