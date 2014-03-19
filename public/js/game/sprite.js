define(['classy'], 
function(Class){
 
    var Sprite = Class.$extend({
 
        __init__: function( src, sizeX , sizeY , speed, frames, isHorizontal, isSingle ){
            if (isHorizontal === undefined)
                this.isHorizontal = true;
            else
                this.isHorizontal = isHorizontal;
            
            if (isSingle === undefined)
                this.isSingle = false; 
            else
                this.isSingle = isSingle;
            
            this.sizeX = sizeX; //Размер кадра
            this.sizeY = sizeY;
            this.speed = speed;
            this.frames = frames;
            this._index = 0;
            this.src = src;
            this.wasPlayed = false;
        },

        update: function() {
            this._index += this.speed;
        },
 
        render: function(context , x , y ,radius , ddx , ddy) {
            this.update();
            var frame;
 
            if(this.speed > 0) {
                var max = this.frames.length;
                var idx = Math.floor(this._index);
                frame = this.frames[idx % max];
            }
            else 
                frame = 0;
            
            var dx = 0;
            var dy = 0;

            if (this.isHorizontal)
            	dx += frame * this.sizeX;
            else
                dy += frame * this.sizeY;
            context.drawImage(this.src,
                          dx, dy,
                          this.sizeX, this.sizeY,
                          x - radius - ddx, y - radius - ddy,
                          this.sizeX, this.sizeY);
            if (this.isSingle && frame === max - 1){
                this.wasPlayed = true;
            }
        }
    });
    return Sprite;
});