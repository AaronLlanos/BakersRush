'use strict';

angular.module('app.game')
	.factory('GameStates', ['Phaser', 'IntroductionFactory', function (Phaser, IntroductionFactory) {
		

		function getIntro (iGame, scope){
			return IntroductionFactory.getIntro(iGame, scope);
		}

		function getLevel1 (iGame){
			return;
		}

		return {
			Introduction: getIntro,
			Level1: getLevel1
		};
	}]);