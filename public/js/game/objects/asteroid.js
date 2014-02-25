define(['game/objects/object'], 
function(AbstractObject){
	var Asteroid = AbstractObject.$extend({
		__init__: function(color, x, y, radius, src, speedX, speedY ){
			this.health = Math.floor(Math.random()*3) + 1 ;
			this.$super(color, x, y, radius * this.health, src);
    		this.initMotion(speedX, speedY);	
		}
	});

	return Asteroid;
});