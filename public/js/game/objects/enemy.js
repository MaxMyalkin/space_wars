define(['game/objects/object',
        'game/objects/bullet',
        'soundjs'
    ],
    function(AbstractObject,
        Bullet,
        SoundJS
    ) {
        var Enemy = AbstractObject.$extend({
            __init__: function(color, width, height, resources, type) {
                this.type = type;
                switch (this.type) {
                    case 1:
                        resource = resources.get("enemyFirst");
                        this.speed = {
                            vector: 2,
                            x: 0,
                            y: 0
                        };
                        break;
                    case 2:
                        resource = resources.get("enemySecond");
                        this.speed = {
                            vector: 3,
                            x: 0,
                            y: 0
                        };
                        break;
                    default:
                        break;
                }

                this.$super(color, Math.random() * (width - 2 * resource.radius) + resource.radius, resource.radius, resource);
                this.bulletTimer = 0;
            },

            launchBullet: function(game) {
                var rocket = new Bullet("#ffffff", this.x,
                    this.y + this.radius, game.resources, 10, 4, this.type);
                game.enemyBullets.push(rocket);
                var instance = SoundJS.Sound.play("attackSound");
            },

            updateSpeed: function(width, height) {
                if (!this.destination || (Math.abs(this.x - this.destination.x) < this.radius && Math.abs(this.y - this.destination.y) < this.radius)) {
                    this.destination = {
                        x: Math.random() * (width - 2 * this.radius) + this.radius,
                        y: Math.random() * (height - 2 * this.radius) + this.radius
                    }
                    var x = this.destination.x - this.x,
                        y = -this.destination.y + this.y,
                        angle = Math.atan2(y, x);
                    this.speed.x = this.speed.vector * Math.cos(angle);
                    this.speed.y = -this.speed.vector * Math.sin(angle);
                }
            }
        });

        return Enemy;
    });