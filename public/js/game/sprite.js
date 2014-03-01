define(['classy', 'game/resources'], 
function(Class, Resources){
 
    var Sprite = Class.$extend({
 
        __init__: function(url, sizeX , sizeY , speed, frames, direction, once){
            if (direction === undefined && direction != "vertical"){
                this.direction = "horizontal";
            }else{
                this.direction = "vertical";
            }
            if (once === undefined){
                this.once = false; 
            }
            this.sizeX = sizeX; //Размер кадра
            this.sizeY = sizeY;
            this.speed = speed;
            this.frames = frames;
            this._index = 0;
            this.url = url;
        },

        update: function() {
            this._index += this.speed;
        },
 
        render: function(context , x , y) {
            this.update();
            var frame;
 
            if(this.speed > 0) {
                var max = this.frames.length;
                var idx = Math.floor(this._index);
                frame = this.frames[idx % max];
            }
            else {
                frame = 0;
            }
            var dx = 0;
            var dy = 0;
            if (this.direction === "vertical"){
                dy += frame * this.sizeY;
            }else{
                dx += frame * this.sizeX;
            }
            context.drawImage(this.url,
                          dx, dy,
                          this.sizeX, this.sizeY,
                          x, y,
                          this.sizeX, this.sizeY);
        }
 
    });
    return Sprite;
});
