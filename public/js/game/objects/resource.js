define(['Classy', '/game/sprite'], 
function(Class, Sprite){
	var Resource = Class.$extend({
		__init__: function(src, type, radius, dx, dy, sizeX , sizeY , speed, frames, direction, once){
			this.src = src;
			this.type = type;
			this.radius = radius;
			this.dx = dx;
			this.dy = dy;
			if (type = "animation"){
				this.sprite = new Sprite(src, sizeX, sizeY, speed, frames, direction, once);
			}
		},

		draw: function(dx, dy){
			if this.sprite === 
		}
	});

	return Asteroid;
});