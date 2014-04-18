define(['classy'],
    function(Class) {
        var Sound = Class.$extend({
            __init__: function(src, times) {
                this.array = [];

                for (var i = 0; i < times; i++) {
                    var sound = new Audio();
                    sound.src = src;
                    this.array.push(sound);
                }
                this.currentSound = 0;
            },

            playSound: function() {
                //this.array[this.currentSound].oncanplaythrough = console.log("CAN");
                this.array[this.currentSound].play();
                this.currentSound = (this.currentSound + 1) % this.array.length;
            }

        });

        return Sound;
    });