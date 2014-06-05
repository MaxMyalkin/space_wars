define(['classy',
        'game/objects/asteroid',
        'game/objects/bonus',
        'game/objects/bigBang',
        'soundjs'
    ],
    function(Class,
        Asteroid,
        Bonus,
        BigBang,
        SoundJS
    ) {

        var GameMechanic = Class.$extend({
            sortArray: function(array) {
                array.sort(function(a, b) {
                    return b - a;
                })
            },

            deleteObjectArray: function(object, array) {
                this.sortArray(array);
                for (var i = 0; i < array.length; i++) {
                    this.deleteObject(object, array[i]);
                };
            },

            deleteObject: function(object, index) {
                object.splice(index, 1);
            },

            drawObjects: function(object, gameHeight, context) {
                var toDelete = [];
                for (var i = 0; i < object.length; i++) {

                    if (object[i].damaged && object[i].whileDamaged > object[i].damagedTimeout) {
                        object[i].initDamaged();
                        object[i].resource = object[i].normalRes;
                    }

                    object[i].draw(context);
                    if ((object[i].y + object[i].radius < 0) || (object[i].y - object[i].radius > gameHeight) ||
                        (object[i].resource != undefined && object[i].resource.sprite != undefined && object[i].resource.sprite.wasPlayed)) {
                        toDelete.push(i);
                    }
                };
                this.deleteObjectArray(object, toDelete);
            },

            update: function(game) {

                if (game.asteroidTimer == game.ASTEROID_TIMEOUT) {
                    if (game.level < 2.5) {
                        game.level += 0.025;
                        game.setLevelInfo();
                    }

                    for (var i = 0; i < game.level - 1; i++)
                        this.createAsteroid(game);
                }

                if (game.asteroidTimer % 1 === 0)
                    this.collisionTest(game);

                if (game.bonusTimer == game.BONUS_TIMEOUT) {
                    this.createBonus(game);
                }

                for (var i = 0; i < game.asteroids.length; i++) {
                    game.asteroids[i].y += game.asteroids[i].speedY;

                    if (game.asteroids[i].damaged) {
                        game.asteroids[i].whileDamaged += 1;
                    }

                    if (game.context.debug != true) {
                        if (this.collision(game.player, game.asteroids[i], 0.95)) {

                            //game.resources.bangSound.playSound();
                            SoundJS.Sound.play("bangSound");

                            game.gameover = true;
                            game.endGame();
                        }
                    }


                }

                for (var i = 0; i < game.player.bullets.length; i++) {
                    game.player.bullets[i].y -= game.player.bullets[i].speedY;
                }

                for (var i = 0; i < game.bonuses.length; i++) {
                    game.bonuses[i].time += 1;
                }

            },

            collisionTest: function(game) {
                var toDeleteAster = [];
                var toDeleteBullet = [];
                var toDeleteBonus = [];
                var toCreateBang = [];
                for (var i = 0; i < game.player.bullets.length; i++) {
                    for (var j = 0; j < game.asteroids.length; j++) {
                        if (this.collision(game.player.bullets[i], game.asteroids[j])) {
                            toDeleteBullet.push(i);

                            game.asteroids[j].resource = game.asteroids[j].damagedRes;
                            game.asteroids[j].damaged = true;

                            if (game.asteroids[j].health <= game.player.bullets[i].damage) {
                                toDeleteAster.push(j);
                                toCreateBang.push(new BigBang("#ffffff", game.asteroids[j].x, game.asteroids[j].y,
                                    game.resources, game.player.bullets[i].type));
                                game.player.score += game.asteroids[j].type;
                                game.setScore();
                                //game.resources.bangSound.playSound();
                                SoundJS.Sound.play("bangSound");
                                break;
                            }
                            game.asteroids[j].health -= game.player.bullets[i].damage;
                        }
                    }
                }

                for (var i = 0; i < game.bonuses.length; i++) {
                    if (this.collision(game.player, game.bonuses[i])) {
                        toDeleteBonus.push(i);
                        game.player.bonusBullets[game.bonuses[i].type - 1] += 5;
                        SoundJS.Sound.play("bonusSound");
                        game.setBulletInfo();
                    } else {
                        if (game.bonuses[i].time > game.BONUS_TERMINATE)
                            toDeleteBonus.push(i);
                    };
                };

                for (var i = toCreateBang.length - 1; i >= 0; i--) {
                    game.bangs.push(toCreateBang[i]);
                };

                this.deleteObjectArray(game.bonuses, toDeleteBonus);

                this.deleteObjectArray(game.player.bullets, toDeleteBullet);

                this.deleteObjectArray(game.asteroids, toDeleteAster);

            },

            draw: function(game) {
                game.context.clearRect(0, 0, game.GAME_WIDTH, game.GAME_HEIGHT);

                game.player.draw(game.context);
                game.context.font = "bold " + game.FONT_SIZE + "px sans-serif";
                this.drawObjects(game.player.bullets, game.GAME_HEIGHT, game.context);
                this.drawObjects(game.asteroids, game.GAME_HEIGHT, game.context);
                this.drawObjects(game.bangs, game.GAME_HEIGHT, game.context);
                this.drawObjects(game.bonuses, game.GAME_HEIGHT, game.context);

            },

            createAsteroid: function(game) {
                game.asteroidTimer = 0;
                var asteroid = new Asteroid("#ffffff", game.GAME_WIDTH, 0, game.resources, game.ASTEROID_SPEED * game.level);
                game.asteroids.push(asteroid);
            },

            createBonus: function(game) {
                game.bonusTimer = 0;
                var bonus = new Bonus("#ffffff", Math.random() * game.GAME_WIDTH, Math.random() * game.GAME_HEIGHT, game.resources, Math.floor(Math.random() * 2) + 1);
                game.bonuses.push(bonus);
            },

            collision: function(object1, object2, percent) {
                if (percent === undefined) {
                    percent = 1;
                }
                if (Math.sqrt(Math.pow(object2.x - object1.x, 2) + Math.pow(object2.y - object1.y, 2)) < (object1.radius + object2.radius) * percent) {
                    return true;
                } else {
                    return false;
                }
            }
        });

        return GameMechanic;
    });