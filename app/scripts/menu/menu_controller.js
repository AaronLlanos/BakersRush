'use strict';
/*jshint unused: false */

angular.module('app.menu')
	.controller('MenuCtrl', [function () {
		var ctrl = this;
		var audioElement = angular.element('audio')[0];
		ctrl.levels = [];
		ctrl.playSound = function (){
			audioElement.play();
		};
		ctrl.createId = function () {
			return new Date().getTime().toString();
		};
	}]);