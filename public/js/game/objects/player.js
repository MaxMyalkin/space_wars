define(['game/objects/object',
 'game/objects/bullet',
 ], 
function(AbstractObject,
 Bullet
 ){
	var Player = AbstractObject.$extend({
		__init__: function(color, x, y, radius, src, speedX, speedY){
			this.$super(color, x, y, radius, "");
    		this.score = 0;
    		this.bullets = [];
    		this.initMotion(speedX, speedY);
    		this.initAnimation(src, 95, 100 ,0.3, [0,1,2,3]);
		},

		launchBullet: function(game){
		    var rocket = new Bullet("#ffffff", this.x , 
		        this.y - game.PLAYER_RADIUS, game.resources, game.ROCKET_SPEED);
		    this.bullets.push(rocket);
		}
	});

	return Player;
});