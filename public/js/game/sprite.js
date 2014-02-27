define(['classy', 'game/resources'], 
function(Class, Resources){
 
    var Sprite = Class.$extend({
 
        __init__: function(url, sizeX , sizeY , speed, frames){
            this.posSliceX = 0;
            this.sizeX = sizeX;
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
 
            var dx = this.posSliceX; // начальная позиция 
            dx += frame * this.sizeX;
            context.drawImage(this.url,
                          dx, 0,
                          this.sizeX, this.sizeY,
                          x, y,
                          this.sizeX, this.sizeY);
        }
 
    });
    return Sprite;
});
