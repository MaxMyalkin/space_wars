define(['game/objects/object',
 'game/objects/bullet',
 ], 
function(AbstractObject,
 Bullet
 ){
	var Player = AbstractObject.$extend({
		__init__: function(color, x, y, resource){
			this.$super(color, x, y, resource);
    		this.score = 0;
    		this.bullets = [];
    		this.bonusBullets = [0, 0];
		},

		launchBullet: function(game , type){
		    var rocket = new Bullet("#ffffff", this.x, 
		        this.y - game.player.radius, game.resources, game.ROCKET_SPEED , type);
		    this.bullets.push(rocket);
		    game.resources.attackSound.playSound();
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