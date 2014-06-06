define(['game/objects/object'],
    function(AbstractObject) {
        var BigBang = AbstractObject.$extend({
            __init__: function(color, x, y, resources, bulletType, speed) {
                var bangType = "firstTypeBang";
                switch (bulletType) {
                    case 2:
                        bangType = "secondTypeBang";
                        break;
                    case 3:
                        bangType = "thirdTypeBang";
                        break;
                    default:
                        break;
                }
                this.$super(color, x, y, resources.get(bangType));
                this.initMotion(0, speed);
            }
        });

        return BigBang;
    });