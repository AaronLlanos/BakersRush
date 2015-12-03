'use strict';

angular.module('app.game')
	.factory('IntroductionFactory', ['Phaser', function (Phaser) {
		

		var mouse, food, cheese, platform, cPlatform, pPlatform, onCheese,
			score = 0, scoreLabel, scoreFont, scorePosition;

		function Introduction (iGame, scope){
			

			return {
				//find objects in a Tiled layer that containt a property called "type" equal to a certain value
				findObjectsByType: function(type, map, layer) {
				    var result = [];
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
					iGame.load.tilemap('introMap', 'assets/maps/intro_map.json', null, Phaser.Tilemap.TILED_JSON);
					iGame.load.spritesheet('mouse', 'assets/sprites/mouse.png', 100, 50);
					iGame.load.image('platform', 'assets/sprites/platformsprite.png', 25, 25);
					iGame.load.image('cheese', 'assets/sprites/cheese.png', 75, 75);
					iGame.load.image('cookie', 'assets/cookie-crumb.png');
					iGame.load.spritesheet('map_tiles', 'assets/maps/tilemap.png', 100, 100);
					iGame.load.image('background_image', 'assets/woodgrain-background.jpg');
					onCheese = false;
				},
				create: function(){
					var that = this;
					// World
					this.map = iGame.add.tilemap('introMap');
					this.background = iGame.add.tileSprite(0, 0, this.world.width, this.world.height, 'background_image');
					this.background.fixedToCamera = true;
				    this.map.addTilesetImage('cheese', 'cheese');
				    this.map.addTilesetImage('objectLayer', 'cookie');
				    this.map.addTilesetImage('platform', 'platform');
				    this.map.addTilesetImage('tileMap', 'map_tiles');

				    // THE CHEESE
				    var result = this.findObjectsByType('cheese', this.map, 'Object Layer 1');
				    cheese = iGame.add.group();
					cheese.enableBody = true;
					angular.forEach(result, function (element){
						that.createFromTiledObject(element, cheese);
					});

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
					result = this.findObjectsByType('playerStart', this.map, 'Object Layer 1');
					mouse = iGame.add.sprite(result[0].x, result[0].y, 'mouse');
					iGame.physics.enable(mouse, Phaser.Physics.ARCADE);
					mouse.animations.add('idle_right', [0], 5, true);
					mouse.animations.add('right', [1,2], 5, true);
					mouse.animations.add('idle_left', [3], 5, true);
					mouse.animations.add('left', [4,5], 5, true);
					mouse.facing = 'right'; // Should only ever be left or right.
					iGame.camera.follow(mouse);

					// Score
					this.createScore();

				},
				update: function(){
					//collision
					iGame.physics.arcade.collide(mouse, this.tileLayer);
					iGame.physics.arcade.overlap(mouse, food, this.collect, null, this);
					iGame.physics.arcade.overlap(mouse, platform, this.onPlatform, null, this);
					iGame.physics.arcade.overlap(mouse, cheese, this.endLevel, null, this);
				},
				collect: function (player, collectable) {
					// console.log('yum!');
					collectable.destroy();
					score += 10;
					scoreLabel.text = "Score: " + score;
				},
				endLevel: function (player, cheese){
					if (cPlatform !== cheese){
						pPlatform = cPlatform;
						cPlatform = cheese;

						this.changeDir('idle');
						player.body.x = cheese.body.x;
						player.body.y = cheese.body.y;

						// Send a signal to the game controller that the level is finished
						scope.endLevel();
					}
				},
				onPlatform: function (player, platform) {
					var direction;
					if(cPlatform !== platform){
						pPlatform = cPlatform;
						cPlatform = platform;

						// Just move the mouse to the center of the new platform and sit him down.
						this.changeDir('idle');
						player.body.x = platform.body.x - 50;
						player.body.y = platform.body.y;
						scope.completeDirection(false);
						
						// Check to see if the mouse should be moved to a new platform
						if (scope.fval.length > 0) {
							direction = scope.fval.pop();
							this.changeDir(direction.func);
							scope.nextDirection();
						}
					}
				},
				createScore: function(){
 					scoreFont = "20px Arial";
 					scorePosition = {
 						x: iGame.world.bounds.topLeft.x,
 						y: iGame.world.bounds.topLeft.y
 					};
				    //Create the score label
				    scoreLabel = iGame.add.text(scorePosition.x + 60, scorePosition.y, "Score: 0", {font: scoreFont, stroke: "#ff51d8", strokeThickness: 15}); 
				    scoreLabel.fixedToCamera = true;
				},
				changeDir: function (direction){
					// console.log('changing dir to ' + direction);
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
				}
			};
		}

		return {
			getIntro: Introduction,
			getMouse: mouse
		};
	}]);
