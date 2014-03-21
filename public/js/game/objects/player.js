define(['game/objects/object',
 'game/objects/bullet',
 ], 
function(AbstractObject,
 Bullet
 ){
	var Player = AbstractObject.$extend({
		__init__: function(color, x, y, resource){
			this.type = 0;
			this.setProperties();
			this.$super(color, x, y, resource[this.type][0]);
    		this.score = 0;
    		this.bullets = [];
    		this.bonusBullets = [0, 0];
		},

		launchBullet: function(game , type){
		    var rocket = new Bullet("#ffffff", this.x, 
		        this.y - game.player.radius, game.resources, game.ROCKET_SPEED , type , this.damageMultiplier);
		    this.bullets.push(rocket);
		    game.resources.attackSound.playSound();
		},

		changeTypeOfShip: function(resource , type , width , height){
			this.type = type;
			this.radius = resource[this.type][0].radius;
			if( this.x > width - this.radius)
				this.x = width - this.radius;
			if( this.x < this.radius)
				this.x = this.radius;
			if( this.y > height - this.radius)
				this.y = height - this.radius;
			if( this.y < this.radius )
				this.y = this.radius;
			this.setProperties();
		},

		move: function(x , y , width , height) {
			if( this.x + x <= width - this.radius && this.x + x >= this.radius)
				this.x += x;
			if( this.y + y <= height - this.radius && this.y + y >= this.radius)
				this.y +=y;
		},

		setProperties: function() {
			switch(this.type) {
				case 0:
					this.hspeed = 10;
					this.vspeed = 10;
					this.damageMultiplier = 1;
					break;
				case 1:
					this.hspeed = 15;
					this.vspeed = 15;
					this.damageMultiplier = 2;
					break;
			}
		}

	});

	return Player;
});