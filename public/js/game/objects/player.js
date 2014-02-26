define(['game/objects/object', 'game/objects/bullet', 'easeljs'], 
function(AbstractObject, Bullet, easeljs){
	var Player = AbstractObject.$extend({
		__init__: function(color, x, y, width, height, src, speedX, speedY){
			this.$super(color, x, y, width, height, src);
    		this.score = 0;
    		this.bullets = [];
    		this.initMotion(speedX, speedY);
		},

		launchBullet: function(game){
		    var rocket = new Bullet("#ffffff", this.x + this.width/2 - game.ROCKET_WIDTH/2, 
		        this.y, game.ROCKET_WIDTH, game.ROCKET_HEIGHT, "", 0, game.ROCKET_SPEED);
		    this.bullets.push(rocket);
		}
	});

	return Player;
});