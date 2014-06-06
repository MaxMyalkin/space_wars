define(['game/objects/object'],
    function(AbstractObject) {
        var Bonus = AbstractObject.$extend({
            __init__: function(color, x, y, resources, type) {
                this.type = type;
                var resource;
                switch (this.type) {
                    case 1:
                        resource = resources.firstTypeBonus;
                        break;
                    case 2:
                        resource = resources.secondTypeBonus;
                        break;
                    case 3:
                        resource = resources.health; // здоровье
                        break;
                    default:
                        break;
                }
                this.$super(color, x, y, resource);
                this.initRotation(0, 3);
                this.initMotion(0, 5);
                this.time = 0;
            },

            getMeBonus: function(player) {
                switch (this.type) {
                    case 1:
                    case 2:
                        player.bonusBullets[this.type - 1] += 5;
                        break;
                    case 3:
                        player.health += 5;
                        break;
                }
            }

        });
        return Bonus;
    });