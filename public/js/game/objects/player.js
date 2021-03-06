define(['game/objects/object',
        'game/objects/bullet',
        'soundjs'
    ],
    function(AbstractObject,
        Bullet,
        SoundJS
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
                this.joystickX = 0;
                this.joystickY = 0;
                this.health = 10;
            },

            launchBullet: function(game, type) {
                if (game.bulletTimer > game.BULLET_TIMEOUT) {
                    switch (type) {
                        case 2:
                            if (this.bonusBullets[0] <= 0)
                                return;
                            this.bonusBullets[0] -= 1;
                            game.setBulletInfo();
                            break;

                        case 3:
                            if (this.bonusBullets[1] <= 0)
                                return;
                            this.bonusBullets[1] -= 1;
                            game.setBulletInfo();
                            break;
                    };
                    game.bulletTimer = 0;
                    var rocket = new Bullet("#ffffff", this.x,
                        this.y - game.player.radius, game.resources, game.ROCKET_SPEED, type, this.damageMultiplier);
                    this.bullets.push(rocket);
                    var instance = SoundJS.Sound.play("attackSound");
                    instance.addEventListener("complete", function() {
                        SoundJS.Sound.play("reloadSound");
                    });
                }

            },

            joystickMove: function(width, height, x, y) {

                this.joystickX = x;
                this.joystickY = y;
                if (this.x + x <= width - this.radius && this.x + x >= this.radius)
                    this.x += x;
                if (this.y + y <= height - this.radius && this.y + y >= this.radius)
                    this.y += y;
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

                this.leftspeed += left;
                if (this.leftspeed > this.maxhspeed)
                    this.leftspeed = this.maxhspeed;
                if (this.leftspeed < 0)
                    this.leftspeed = 0;

                this.rightspeed += right;
                if (this.rightspeed > this.maxhspeed)
                    this.rightspeed = this.maxhspeed;
                if (this.rightspeed < 0)
                    this.rightspeed = 0;

                this.frontspeed += up;
                if (this.frontspeed > this.maxvspeed)
                    this.frontspeed = this.maxvspeed;
                if (this.frontspeed < 0)
                    this.frontspeed = 0;

                this.backspeed += down;
                if (this.backspeed > this.maxvspeed)
                    this.backspeed = this.maxvspeed;
                if (this.backspeed < 0)
                    this.backspeed = 0;
            },

            setProperties: function() {
                switch (this.type) {
                    case 0:
                        this.maxhspeed = 10;
                        this.maxvspeed = 10;
                        this.damageMultiplier = 1;
                        this.acceleration = 0.5;
                        this.deceleration = 0.3;
                        break;
                    case 1:
                        this.maxhspeed = 7;
                        this.maxvspeed = 7;
                        this.damageMultiplier = 2;
                        this.acceleration = 0.3;
                        this.deceleration = 0.4;
                        break;
                }
            },

            setStartPosition: function(width, height) {
                this.x = (width - this.radius) / 2;
                this.y = (height - this.radius);
                this.joystickX = 0;
                this.joystickY = 0;
            },

            resetAll: function() {
                this.score = 0;
                this.bonusBullets = [0, 0];
                this.frontspeed = 0;
                this.backspeed = 0;
                this.leftspeed = 0;
                this.rightspeed = 0;
                this.health = 10;
            }
        });

        return Player;
    });