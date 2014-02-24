define(['game/objects/object'], 
function(AbstractObject){
	var Asteroid = AbstractObject.$extend({
		__init__: function(color, x, y, width, height, src, speedX, speedY){
			this.$super(color, x, y, width, height, src);
    		this.initMotion(speedX, speedY);
		}
	});

	return Asteroid;
});