define(['game/objects/object'],
    function(AbstractObject) {
        var Bullet = AbstractObject.$extend({
            __init__: function(color, x, y, resources, constSpeed, type, damageMultiplier) {
                this.type = type;
                this.damage = type * damageMultiplier;
                var radius;
                var resource;
                switch (this.type) {
                    case 1:
                        resource = resources.get("firstTypeBullet");
                        break;
                    case 2:
                        resource = resources.get("secondTypeBullet");
                        break;
                    case 3:
                        resource = resources.get("thirdTypeBullet");
                        break;
                    default:
                        break;
                }
                this.initMotion(0, constSpeed * this.type / 2);
                this.$super(color, x, y, resource);
            }
        });

        return Bullet;
    });