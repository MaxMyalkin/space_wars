define(['classy',
        'game/objects/asteroid',
        'game/objects/bonus',
        'game/objects/enemy',
        'game/objects/bigBang',
        'soundjs'
    ],
    function(Class,
        Asteroid,
        Bonus,
        Enemy,
        BigBang,
        SoundJS
    ) {

        var GameMechanic = Class.$extend({

            sortArray: function(array) {
                array.sort(function(a, b) {
                    return b - a;
                });
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
                var isDead = false;
                var toDeleteAster = [];
                var toDeleteBullet = [];
                var toDeleteBonus = [];
                var toCreateBang = [];
                var toDeleteEnemies = [];
                var toDeleteEnemyBullets = [];

                if (game.launchBullet.isShooted) {
                    game.player.launchBullet(game, game.launchBullet.type);
                }

                if (game.enemyTimer == game.ENEMY_TIMEOUT) {
                    this.createEnemy(game);

                }

                if (game.asteroidTimer == game.ASTEROID_TIMEOUT) {
                    if (game.level < 2.5) {
                        game.level += 0.025;
                        game.setLevelInfo();
                    }

                    for (var i = 0; i < game.level - 1; i++)
                        this.createAsteroid(game);
                }

                if (game.bonusTimer == game.BONUS_TIMEOUT) {
                    this.createBonus(game);
                }

                for (var i = 0; i < game.bangs.length; i++) {
                    game.bangs[i].y += game.bangs[i].speedY;
                    game.bangs[i].x += game.bangs[i].speedX;
                }

                for (var i = 0; i < game.enemies.length; i++) {
                    enemy = game.enemies[i];
                    enemy.y += enemy.speed;

                    if (this.collision(enemy, game.player)) {
                        toDeleteEnemies.push(i);
                        toCreateBang.push(new BigBang("#ffffff", enemy.x, enemy.y,
                            game.resources, 4, enemy.speed));
                        game.player.health -= 5;
                        game.setBulletInfo();
                        SoundJS.Sound.play("bangSound");
                    }

                    if (enemy.bulletTimer == 50) {
                        enemy.bulletTimer = 0;
                        enemy.launchBullet(game);
                    } else {
                        enemy.bulletTimer += 1;
                    }
                }

                for (var i = 0; i < game.asteroids.length; i++) {
                    game.asteroids[i].y += game.asteroids[i].speedY;
                    game.asteroids[i].x += game.asteroids[i].speedX;

                    if (game.asteroids[i].damaged) {
                        game.asteroids[i].whileDamaged += 1;
                    }

                    if (game.context.debug != true) {
                        if (this.collision(game.player, game.asteroids[i], 0.95)) {
                            toDeleteAster.push(i);
                            game.player.health -= game.asteroids[i].type;
                            toCreateBang.push(new BigBang("#ffffff", game.asteroids[i].x, game.asteroids[i].y,
                                game.resources, 4, game.asteroids[i].speedY));
                            game.setBulletInfo();
                            SoundJS.Sound.play("bangSound");
                        }
                    }
                }


                for (var i = 0; i < game.player.bullets.length; i++) {
                    game.player.bullets[i].y -= game.player.bullets[i].speedY;
                    for (var j = 0; j < game.asteroids.length; j++) {
                        if (this.collision(game.player.bullets[i], game.asteroids[j])) {
                            toDeleteBullet.push(i);
                            game.asteroids[j].resource = game.asteroids[j].damagedRes;
                            game.asteroids[j].damaged = true;

                            if (game.asteroids[j].health <= game.player.bullets[i].damage) {
                                toDeleteAster.push(j);
                                toCreateBang.push(new BigBang("#ffffff", game.asteroids[j].x, game.asteroids[j].y,
                                    game.resources, game.player.bullets[i].type, game.asteroids[j].speedY));
                                game.player.score += game.asteroids[j].type;
                                game.setScore();
                                SoundJS.Sound.play("bangSound");
                                break;
                            }
                            game.asteroids[j].health -= game.player.bullets[i].damage;
                        }
                    }

                    for (var j = 0; j < game.enemies.length; j++) {
                        if (this.collision(game.player.bullets[i], game.enemies[j])) {
                            toDeleteBullet.push(i);
                            toDeleteEnemies.push(j);
                            toCreateBang.push(new BigBang("#ffffff", game.enemies[j].x, game.enemies[j].y,
                                game.resources, game.player.bullets[i].type, game.enemies[j].speed));
                            game.player.score += 10;
                            game.setScore();
                            SoundJS.Sound.play("bangSound");
                        }
                    }
                }

                for (var i = 0; i < game.enemyBullets.length; i++) {
                    game.enemyBullets[i].y += game.enemyBullets[i].speedY;
                    if (this.collision(game.enemyBullets[i], game.player)) {
                        toCreateBang.push(new BigBang("#ffffff", game.player.x, game.player.y,
                            game.resources, 4, game.enemyBullets[i].speedY));
                        game.player.health -= game.enemyBullets[i].type;
                        toDeleteEnemyBullets.push(i);
                        game.setBulletInfo();
                    }
                }

                for (var i = 0; i < game.bonuses.length; i++) {
                    game.bonuses[i].time += 1;
                    game.bonuses[i].y += game.bonuses[i].speedY;
                    if (this.collision(game.bonuses[i], game.player)) {
                        toDeleteBonus.push(i);
                        game.bonuses[i].getMeBonus(game.player);
                        SoundJS.Sound.play("bonusSound");
                        game.setBulletInfo();
                    } else
                    if (game.bonuses[i].time > game.BONUS_TERMINATE)
                        toDeleteBonus.push(i);
                }

                if (isDead || game.player.health <= 0) {
                    SoundJS.Sound.play("bangSound");
                    game.gameover = true;
                    game.endGame();
                }

                this.deleteObjectArray(game.bonuses, toDeleteBonus);
                this.deleteObjectArray(game.player.bullets, toDeleteBullet);
                this.deleteObjectArray(game.asteroids, toDeleteAster);
                this.deleteObjectArray(game.enemies, toDeleteEnemies);
                this.deleteObjectArray(game.enemyBullets, toDeleteEnemyBullets);

                for (var i = 0; i < toCreateBang.length; i++) {
                    game.bangs.push(toCreateBang[i]);
                };

            },

            draw: function(game) {
                game.context.clearRect(0, 0, game.GAME_WIDTH, game.GAME_HEIGHT);
                game.player.draw(game.context);
                game.context.font = "bold " + game.FONT_SIZE + "px sans-serif";
                this.drawObjects(game.player.bullets, game.GAME_HEIGHT, game.context);
                this.drawObjects(game.asteroids, game.GAME_HEIGHT, game.context);
                this.drawObjects(game.bangs, game.GAME_HEIGHT, game.context);
                this.drawObjects(game.bonuses, game.GAME_HEIGHT, game.context);
                this.drawObjects(game.enemies, game.GAME_HEIGHT, game.context);
                this.drawObjects(game.enemyBullets, game.GAME_HEIGHT, game.context);
            },

            createAsteroid: function(game) {
                game.asteroidTimer = 0;
                var asteroid = new Asteroid("#ffffff", game.GAME_WIDTH, 0, game.resources, game.ASTEROID_SPEED * game.level);
                game.asteroids.push(asteroid);
            },

            createEnemy: function(game) {
                game.enemyTimer = 0;
                var enemy = new Enemy("#ffffff", game.GAME_WIDTH, 0, game.resources, Math.floor(Math.random() * 2 + 1));
                game.enemies.push(enemy);
            },

            createBonus: function(game) {
                game.bonusTimer = 0;
                var bonus = new Bonus("#ffffff", Math.random() * game.GAME_WIDTH, Math.random() * game.GAME_HEIGHT, game.resources, Math.floor(Math.random() * 3) + 1);
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