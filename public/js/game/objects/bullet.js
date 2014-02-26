define(['game/objects/object'], 
function(AbstractObject){
	var Bullet = AbstractObject.$extend({
		__init__: function(color, x, y, resources, constSpeed){
			this.type = Math.floor(Math.random() * 2 + 1);
			this.damage = this.type; 
			var radius;
    		var src;
			switch(this.type){
				case 1:
					src = resources.redBulletImg;
					radius = resources.redBulletRealD/2;
					break;
				case 2:
					src = resources.greenBulletImg;
					radius = resources.greenBulletRealD/2;
					break;
				default:
					break;
			}		
    		this.initMotion(0 , constSpeed * this.type / 2 );
    		console.log(this.damage + "  " + this.type);
			this.$super(color, x, y, radius, src);
		}
	});
	
	return Bullet;
});