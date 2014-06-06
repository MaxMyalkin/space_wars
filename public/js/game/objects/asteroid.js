define(['game/objects/object'],
    function(AbstractObject) {
        var Asteroid = AbstractObject.$extend({
            __init__: function(color, x, y, resources, constSpeed) {
                this.type = Math.floor(Math.random() * 3) + 1;
                this.health = Math.floor(this.type * 1.5);
                var resource;
                switch (this.type) {
                    case 1:
                        resource = resources.smallAsteroid;
                        this.damagedRes = resources.smallAsteroidDamaged;
                        break;
                    case 2:
                        resource = resources.mediumAsteroid;
                        this.damagedRes = resources.mediumAsteroidDamaged;
                        break;
                    case 3:
                        resource = resources.bigAsteroid;
                        this.damagedRes = resources.bigAsteroidDamaged;
                        break;
                    default:
                        break;
                }
                var asteroidPosition = Math.random() * (x - 2 * resource.radius) + resource.radius;
                this.$super(color, asteroidPosition, y, resource);

                this.initDamaged();
                this.normalRes = this.resource;

                this.initMotion(0, constSpeed / this.type);
                this.initRotation(0, 1);
            },

            initDamaged: function() {
                this.whileDamaged = 0;
                this.damagedTimeout = 10;
                this.damaged = false;
            }



        });

        return Asteroid;
    });