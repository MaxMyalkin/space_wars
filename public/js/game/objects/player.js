define(['game/objects/object',
 'game/objects/bullet',
 ], 
function(AbstractObject,
 Bullet
 ){
	var Player = AbstractObject.$extend({
		__init__: function(color, x, y, radius, src, speedX, speedY){
			this.$super(color, x, y, radius, src);
    		this.score = 0;
    		this.bullets = [];
    		this.initMotion(speedX, speedY);
		},

		launchBullet: function(game){
		    var rocket = new Bullet("#ffffff", this.x , 
		        this.y, game.ROCKET_RADIUS, "", 0, game.ROCKET_SPEED);
		    this.bullets.push(rocket);
		}
	});

	return Player;
});