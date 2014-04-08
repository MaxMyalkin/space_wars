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
                    default:
                        break;
                }
                this.$super(color, x, y, resource);
                this.initRotation(0, 3);
                this.time = 0;
            }
        });
        return Bonus;
    });