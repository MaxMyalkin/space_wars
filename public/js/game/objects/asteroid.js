define(['game/objects/object'], 
function(AbstractObject){
	var Asteroid = AbstractObject.$extend({
		__init__: function(color, x, y, resources, constSpeed ){
			this.type = Math.floor(Math.random()*3) + 1;
			this.health = Math.floor(this.type * 1.5);
			var resource; 
			switch(this.type){
				case 1:
					resource = resources.smallAsteroid;
					break;
				case 2:
					resource = resources.mediumAsteroid;
					break;
				case 3:
					resource = resources.bigAsteroid;
					break;
				default:
					break;
			}
			var asteroidPosition = Math.random()*( x - 2 * resource.radius ) + resource.radius;
			this.$super(color, asteroidPosition, y, resource);
    		this.initMotion(0 , constSpeed / this.type );	
    		this.initRotation(0, 1);
		}
	});

	return Asteroid;
});