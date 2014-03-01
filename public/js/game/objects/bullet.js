define(['game/objects/object'], 
function(AbstractObject){
	var Bullet = AbstractObject.$extend({
		__init__: function(color, x, y, resources, constSpeed){
			this.type = Math.floor(Math.random() * 2 + 1);
			this.damage = this.type; 
			var radius;
    		var src = "";
			switch(this.type){
				case 1:
					src = resources.redBulletImg;
					radius = resources.redBulletD/2;
					this.initAnimation(src, 20, 50, 0.3, [4, 5, 6, 7], "vertical");
					break;
				case 2:
					src = resources.greenBulletImg;
					radius = resources.greenBulletD/2;
					this.initAnimation(src, 20, 50, 0.3, [0, 1, 2, 3], "vertical");
					break;
				default:
					break;
			}		
    		this.initMotion(0 , constSpeed * this.type / 2 );
    		//console.log(this.damage + "  " + this.type);

			this.$super(color, x, y, radius, src);
		}
	});
	
	return Bullet;
});