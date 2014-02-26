define(['classy'
 ], 
function(Class
 ){
	var resources = Class.$extend({
		__init__: function(){
			this.smallAsteroidImg = "/images/smallAsteroid.png";
			this.smallAsteroidRealD = 46;
			this.smallAsteroidImgD = 40;

			this.bigAsteroidImg = "/images/bigAsteroid.png";
			this.bigAsteroidImgD = 90;
			this.bigAsteroidRealD = 94;

			this.mediumAsteroidImg = "/images/mediumAsteroid.png";
			this.mediumAsteroidRealD = 80;
			this.mediumAsteroidImgD = 74;

			this.playerLeftImg = "/images/shipLeft.png";

			this.playerRightImg = "/images/shipRight.png";

			this.playerImg = "/images/ship.png";
			this.playerRealD = 93;
			this.playerImgD = 88;
				
			this.redBulletImg = "/images/redBullet.png";
			this.redBulletRealD = 33;
			this.redBulletD = 28;
		}
	});

	return resources;
});