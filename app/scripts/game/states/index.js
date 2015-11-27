'use strict';

angular.module('app.game')
	.factory('GameStates', ['Phaser', 'IntroductionFactory', function (Phaser, IntroductionFactory) {
		

		function getIntro (iGame){
			return IntroductionFactory.getIntro(iGame);
		}

		function getLevel1 (iGame){
			return;
		}

		return {
			Introduction: getIntro,
			Level1: getLevel1
		};
	}]);