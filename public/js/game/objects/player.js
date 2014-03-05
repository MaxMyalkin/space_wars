define(['game/objects/object',
 'game/objects/bullet',
 ], 
function(AbstractObject,
 Bullet
 ){
	var Player = AbstractObject.$extend({
		__init__: function(color, x, y, radius, src){
			this.$super(color, x, y, radius, "");
    		this.score = 0;
    		this.bullets = [];
    		this.bonusBullets = [0, 0];
    		this.initAnimation(src, 95, 100 ,0.3, [0,1,2,3]);
		},

		launchBullet: function(game , type){
		    var rocket = new Bullet("#ffffff", this.x, 
		        this.y - game.PLAYER_RADIUS, game.resources, game.ROCKET_SPEED , type);
		    this.bullets.push(rocket);
		},

		move: function(x , y , width , height) {
			if( this.x + x <= width - this.radius && this.x + x >= this.radius)
				this.x += x;
			if( this.y + y <= height - this.radius && this.y + y >= this.radius)
				this.y +=y;
		}
	});

	return Player;
});