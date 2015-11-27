'use strict';
/*jshint multistr: true */

angular.module('app.game', [])
.config(function($stateProvider) {
  $stateProvider
    .state('game', {
      url: '/game',
      abstract: true,
      template: '<div game-canvas></div>'
    })
    .state('game.play', {
      url: '/:id',
      controller: 'GameCtrl'
    });
});