define(['game/objects/object',
        'game/objects/bullet',
    ],
    function(AbstractObject,
        Bullet
    ) {
        var Player = AbstractObject.$extend({
            __init__: function(color, width, height, resource) {
                this.type = 0;
                this.setProperties();
                this.$super(color, 0, 0, resource[this.type][0]);
                this.setStartPosition(width, height);
                this.score = 0;
                this.bullets = [];
                this.bonusBullets = [0, 0];
                this.leftspeed = 0;
                this.rightspeed = 0;
                this.frontspeed = 0;
                this.backspeed = 0;
            },

            launchBullet: function(game, type) {
                var rocket = new Bullet("#ffffff", this.x,
                    this.y - game.player.radius, game.resources, game.ROCKET_SPEED, type, this.damageMultiplier);
                this.bullets.push(rocket);
                game.resources.attackSound.playSound();
            },

            changeTypeOfShip: function(resource, type, width, height) {
                this.type = type;
                this.radius = resource[this.type][0].radius;
                if (this.x > width - this.radius)
                    this.x = width - this.radius;
                if (this.x < this.radius)
                    this.x = this.radius;
                if (this.y > height - this.radius)
                    this.y = height - this.radius;
                if (this.y < this.radius)
                    this.y = this.radius;
                this.setProperties();
            },

            move: function(width, height) {
                var x = this.rightspeed - this.leftspeed;
                var y = -this.frontspeed + this.backspeed;
                if (this.x + x <= width - this.radius && this.x + x >= this.radius)
                    this.x += x;
                if (this.y + y <= height - this.radius && this.y + y >= this.radius)
                    this.y += y;
            },

            updateSpeed: function(left, right, up, down) {

                if (this.leftspeed + left <= this.maxhspeed && this.leftspeed + left >= 0) {
                    this.leftspeed += left;
                }

                if (this.rightspeed + right <= this.maxhspeed && this.rightspeed + right >= 0) {
                    this.rightspeed += right;
                }

                if (this.frontspeed + up <= this.maxvspeed && this.frontspeed + up >= 0) {
                    this.frontspeed += up;
                }

                if (this.backspeed + down <= this.maxvspeed && this.backspeed + down >= 0) {
                    this.backspeed += down;
                }

            },

            setProperties: function() {
                switch (this.type) {
                    case 0:
                        this.maxhspeed = 10;
                        this.maxvspeed = 10;
                        this.damageMultiplier = 1;
                        break;
                    case 1:
                        this.maxhspeed = 15;
                        this.maxvspeed = 15;
                        this.damageMultiplier = 2;
                        break;
                }
            },

            setStartPosition: function(width, height) {
                this.x = (width - this.radius) / 2;
                this.y = (height - this.radius);
            },

            resetAll: function() {
                this.score = 0;
                this.bonusBullets = [0, 0];
                this.frontspeed = 0;
                this.backspeed = 0;
                this.leftspeed = 0;
                this.rightspeed = 0;
            }
        });

        return Player;
    });