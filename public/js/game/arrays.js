define(['classy', 'game/objects/resource'],
    function(Class, Resource) {
        var ResourceArray = Class.$extend({

            __init__: function() {
                this.firstTypeBullet = [];
                this.secondTypeBullet = [];
                this.thirdTypeBullet = [];
                this.firstTypeBang = [];
                this.secondTypeBang = [];
                this.thirdTypeBang = [];

                this.currentFirstTypeBullet = 0;
                this.currentSecondTypeBullet = 0;
                this.currentThirdTypeBullet = 0;
                this.currentFirstTypeBang = 0;
                this.currentSecondTypeBang = 0;
                this.currentThirdTypeBang = 0;
            },

            set: function(type, radius, src, isAnimation, dx, dy, speed, width, height, singleAnimation, frames, isHorizontal, times) {
                arrayToSet = null;
                switch (type) {
                    case "firstTypeBullet":
                        this.firstTypeBullet = this.setArray(radius, src, isAnimation, dx, dy, speed, width, height, singleAnimation, frames, isHorizontal, times);
                        break;
                    case "secondTypeBullet":
                        this.secondTypeBullet = this.setArray(radius, src, isAnimation, dx, dy, speed, width, height, singleAnimation, frames, isHorizontal, times);
                        break;
                    case "thirdTypeBullet":
                        this.thirdTypeBullet = this.setArray(radius, src, isAnimation, dx, dy, speed, width, height, singleAnimation, frames, isHorizontal, times);
                        break;
                    case "firstTypeBang":
                        this.firstTypeBang = this.setArray(radius, src, isAnimation, dx, dy, speed, width, height, singleAnimation, frames, isHorizontal, times);
                        break;
                    case "secondTypeBang":
                        this.secondTypeBang = this.setArray(radius, src, isAnimation, dx, dy, speed, width, height, singleAnimation, frames, isHorizontal, times);
                        break;
                    case "thirdTypeBang":
                        this.thirdTypeBang = this.setArray(radius, src, isAnimation, dx, dy, speed, width, height, singleAnimation, frames, isHorizontal, times);
                        break;
                }
            },

            setArray: function(radius, src, isAnimation, dx, dy, speed, width, height, singleAnimation, frames, isHorizontal, times) {
                array = [];
                array[0] = 1; //Current frame in [0] element
                for (var i = 0; i < times; i++) {
                    res = new Resource(radius, src, isAnimation, dx, dy, speed, width, height, singleAnimation, frames, isHorizontal, frames)
                    array.push(res);
                }
                return array;
            },

            getCurrent: function(type) {
                switch (type) {
                    case "firstTypeBullet":
                        return this.getCurrentFrame(this.firstTypeBullet);
                        break;
                    case "secondTypeBullet":
                        return this.getCurrentFrame(this.secondTypeBullet);
                        break;
                    case "thirdTypeBullet":
                        return this.getCurrentFrame(this.thirdTypeBullet);
                        break;
                    case "firstTypeBang":
                        return this.getCurrentFrame(this.firstTypeBang);
                        break;
                    case "secondTypeBang":
                        return this.getCurrentFrame(this.secondTypeBang);
                        break;
                    case "thirdTypeBang":
                        return this.getCurrentFrame(this.thirdTypeBang);
                        break;
                }
            },

            getCurrentFrame: function(array) {
                current = array[0];
                fi = array[current];
                array[0] = current % (array.length - 1) + 1;
                return fi;
            }


        });

        return new ResourceArray();
    });