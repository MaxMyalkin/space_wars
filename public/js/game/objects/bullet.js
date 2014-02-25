define(['game/objects/object'], 
function(AbstractObject){
	var Bullet = AbstractObject.$extend({
		__init__: function(color, x, y, radius, src, speedX, speedY){
			this.$super(color, x, y, radius, src);
    		this.initMotion(speedX, speedY);
		}
	});
	
	return Bullet;
});