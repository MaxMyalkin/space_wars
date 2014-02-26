define(['game/objects/object'], 
function(AbstractObject){
	var Asteroid = AbstractObject.$extend({
		__init__: function(color, x, y, resources, constSpeed ){
			this.type = Math.floor(Math.random()*3) + 1;
			this.health = this.type;
			var src;
			var radius; 
			switch(this.type){
				case 1:
					src = resources.smallAsteroidImg;
					radius = resources.smallAsteroidImgD/2;
					break;
				case 2:
					src = resources.mediumAsteroidImg;
					radius = resources.mediumAsteroidImgD/2;
					break;
				case 3:
					src = resources.bigAsteroidImg;
					radius = resources.bigAsteroidImgD/2;
					break;
				default:
					break;
			}
			var asteroidPosition = Math.random()*( x - 2 * radius ) + radius;
			this.$super(color, asteroidPosition, y, radius, src);
    		this.initMotion(0 , constSpeed / this.type );	
		}
	});

	return Asteroid;
});