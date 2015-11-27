'use strict';

angular.module('app.game')
	.factory('IntroductionFactory', ['Phaser', function (Phaser) {
		
		var mouse, food, user, platform, cPlatform, pPlatform,
			preScoreLabel, scoreLabel, scoreFont, scorePosition,
			controls;		

		function Introduction (iGame, eatCookie){
			

			return {
				//find objects in a Tiled layer that containt a property called "type" equal to a certain value
				findObjectsByType: function(type, map, layer) {
				    var result = new Array();
				    map.objects[layer].forEach(function(element){
						if(element.type === type) {
							//Phaser uses top left, Tiled bottom left so we have to adjust the y position
							//also keep in mind that the cup images are a bit smaller than the tile which is 16x16
							//so they might not be placed in the exact pixel position as in Tiled
							// console.log('we in');
							element.y -= map.tileHeight/(4/3);
							// console.log('moving '+element.type+' by '+map.tileHeight);
							result.push(element);
						}      
				    });
				    return result;
				},
				//create a sprite from an object
				createFromTiledObject: function(element, group) {
					// console.log(element);
				    var sprite = group.create(element.x, element.y, element.properties.display);
				 
				    //copy all properties to the sprite
				    Object.keys(element.properties).forEach(function(key){
				    	// console.log(element.properties[key]);
				        sprite[key] = element.properties[key];
				    });
				},
				preload: function(){
					// iGame.load.image('mouse', 'assets/char-images/sitting-right.png');
					iGame.load.tilemap('introMap', 'assets/maps/intro_map.json', null, Phaser.Tilemap.TILED_JSON);
					iGame.load.spritesheet('mouse', 'assets/sprites/mouse.png', 100, 50);
					iGame.load.image('platform', 'assets/sprites/platformsprite.png', 100, 50);
					iGame.load.image('cookie', 'assets/cookie-crumb.png');
					iGame.load.spritesheet('map_tiles', 'assets/maps/tilemap.png', 100, 100);
					iGame.load.image('background_image', 'assets/woodgrain-background.jpg');
				},
				create: function(){
					var that = this;
					// World
					this.map = iGame.add.tilemap('introMap');
					this.background = iGame.add.tileSprite(0, 0, this.world.width, this.world.height, 'background_image');
					this.background.fixedToCamera = true;
				    this.map.addTilesetImage('objectLayer', 'cookie');
				    this.map.addTilesetImage('platform', 'platform');
				    this.map.addTilesetImage('tileMap', 'map_tiles');
				    this.tileLayer = this.map.createLayer('Tile Layer 1');
				    //collision on blockedLayer
    				this.map.setCollisionBetween(1, 20, true, 'Tile Layer 1');
				    this.tileLayer.resizeWorld();

					// Food
					result = this.findObjectsByType('collectable', this.map, 'Object Layer 1');
					food = iGame.add.group();
					food.enableBody = true;
					angular.forEach(result, function (element){
						that.createFromTiledObject(element, food);
					});

					// Platforms
					result = this.findObjectsByType('platform', this.map, 'Object Layer 1');
					platform = iGame.add.group();
					platform.enableBody = true;
					angular.forEach(result, function (element){
						that.createFromTiledObject(element, platform);
					});

					// Mouse
					var result = this.findObjectsByType('playerStart', this.map, 'Object Layer 1');
					mouse = iGame.add.sprite(result[0].x, result[0].y, 'mouse');
					iGame.physics.enable(mouse, Phaser.Physics.ARCADE);
					mouse.animations.add('idle_right', [0], 5, true);
					mouse.animations.add('right', [1,2], 5, true);
					mouse.animations.add('idle_left', [3], 5, true);
					mouse.animations.add('left', [4,5], 5, true);
					mouse.facing = 'right'; // Should only ever be left or right.

					// Score
					this.createScore();

				},
				update: function(){
					//collision
					iGame.physics.arcade.collide(mouse, this.tileLayer);
					iGame.physics.arcade.overlap(mouse, food, this.collect, null, this);
					iGame.physics.arcade.overlap(mouse, platform, this.onPlatform, null, this);
				},
				collect: function (player, collectable) {
					// console.log('yum!');
					collectable.destroy();

				},
				onPlatform: function (player, platform) {
					// console.log('on platform');
					if(cPlatform !== platform){
						console.log('on new platform');
						pPlatform = cPlatform;
						cPlatform = platform;

						// Just move the mouse to the center of the new platform and sit him down.
						this.stopDir();
						player.body.x = platform.body.x;
						player.body.y = platform.body.y;
					}
				},
				createScore: function(){
 					scoreFont = "20px Arial";
 					scorePosition = {
 						x: iGame.world.bounds.topLeft.x,
 						y: iGame.world.bounds.topLeft.y
 					};
				    //Create the score label
				    preScoreLabel = iGame.add.text(scorePosition.x, scorePosition.y, "Score: ", {font: scoreFont, stroke: "#535353", strokeThickness: 15}); 
				    scoreLabel = iGame.add.text(scorePosition.x + preScoreLabel.width, scorePosition.y, "0", {font: scoreFont, fill: "#ffffff", stroke: "#535353", strokeThickness: 15}); 
				    scoreLabel.anchor.setTo(0.5, 0);
				    scoreLabel.align = 'center';
				},
				changeDir: function (direction){
					console.log('changing dir to ' + direction);
					// Remember that in the game world, the y axis grows downward
					// like memory in a computer. pushl popl. That ol' chestnut. thatl chestnut haha.
					var v = mouse.body.velocity;
					if (direction === 'left'){
						v.x = -200;
						if (mouse.facing !== 'left'){
							mouse.facing = 'left';
						}
						mouse.animations.play('left');
					} else if (direction === 'up'){
						v.y = -200;
						if (mouse.facing === 'left'){
							mouse.animations.play('left'); // Do not add facing down.
						} else {
							mouse.animations.play('right');
						}
					} else if (direction === 'right'){
						v.x = 200;
						if (mouse.facing !== 'right'){
							mouse.facing = 'right';
						}
						mouse.animations.play('right');
					} else if (direction === 'down'){
						v.y = 200;
						if (mouse.facing === 'left'){
							mouse.animations.play('left'); // Do not add facing down.
						} else {
							mouse.animations.play('right');
						}
					} else {
						v.x = 0;
						v.y = 0;
						if (mouse.facing !== 'idle'){
							if (mouse.facing === 'left'){
								mouse.animations.play('idle_left');
							} else{
								mouse.animations.play('idle_right');
							}
						}
				    }
				},
				stopDir: function (){
					// console.log('stopDir()');
					this.changeDir('idle');
				},
				runUserCommand: function (command) {
					var v = mouse.body.velocity;
					this.changeDir(command);
					// while(v !== 0){
						
					// }
				}
			};
		};

		return {
			getIntro: Introduction,
			getMouse: mouse
		};
	}])