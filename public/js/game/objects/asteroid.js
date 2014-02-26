define(['game/objects/object'], 
function(AbstractObject){
	var Asteroid = AbstractObject.$extend({
		__init__: function(color, x, y, radius, resources, speedX, speedY ){
			this.health = Math.floor(Math.random()*3) + 1;
			var src = resources.smallAsteroidImg;
			var radius = resources.smallAsteroidImgD/2;
			switch(this.health){
				case 2:
					src = resources.mediumAsteroidImg;
					radius = resources.mediumAsteroidImgD/2;
					break;
				case 3:
					src = resources.bigAsteroidImg;
					radius = resources.bigAsteroidImgD/2;
					break;
			}
			this.$super(color, x, y, radius, src);
    		this.initMotion(speedX, speedY);	
		}
	});

	return Asteroid;
});