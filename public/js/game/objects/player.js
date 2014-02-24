define(['game/objects/object', 'game/objects/bullet'], 
function(AbstractObject, Bullet){
	var Player = AbstractObject.$extend({
		__init__: function(color, x, y, width, height, src, speedX, speedY){
			this.$super(color, x, y, width, height, src);
    		this.score = 0;
    		this.bullets = [];
    		this.initMotion(speedX, speedY);
		},

	});

	return Player;
});