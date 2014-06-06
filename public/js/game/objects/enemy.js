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
                this.bulletTimer = 0;
            },

            launchBullet: function(game) {
                var rocket = new Bullet("#ffffff", this.x,
                    this.y + this.radius, game.resources, 10, 1, 1);
                game.enemyBullets.push(rocket);
                var instance = SoundJS.Sound.play("attackSound");
            }
        });

        return Enemy;
    });