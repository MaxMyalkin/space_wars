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
                        resource = resources.enemy;
                        this.speed = 2;
                        break;
                    default:
                        break;
                }
                this.$super(color, Math.random() * (width - 2 * resource.radius) + resource.radius, resource.radius, resource);
                this.bullets = [];
                this.bulletTimer = 0;
            },

            launchBullet: function(game) {
                var rocket = new Bullet("#ffffff", this.x,
                    this.y + this.radius, game.resources, 5, 1, 1);
                this.bullets.push(rocket);
                var instance = SoundJS.Sound.play("attackSound");
            }
        });

        return Enemy;
    });