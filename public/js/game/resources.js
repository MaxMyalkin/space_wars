define(['classy'
 ], 
function(Class
 ){
	var resources = Class.$extend({
		__init__: function(){
			
			this.smallAsteroidImg = new Image();
			this.smallAsteroidImg.src = "/images/smallAsteroid.png";
			this.smallAsteroidRealD = 46;
			this.smallAsteroidImgD = 40;

			this.bigAsteroidImg = new Image();
			this.bigAsteroidImg.src = "/images/bigAsteroid.png";
			this.bigAsteroidImgD = 90;
			this.bigAsteroidRealD = 94;

			this.mediumAsteroidImg = new Image();
			this.mediumAsteroidImg.src = "/images/mediumAsteroid.png";
			this.mediumAsteroidRealD = 80;
			this.mediumAsteroidImgD = 74;

			this.playerLeftImg = new Image();
			this.playerLeftImg.src = "/images/shipLeft.png";

			this.playerRightImg = new Image();
			this.playerRightImg.src = "/images/shipRight.png";

			this.playerImg = new Image();
			this.playerImg.src = "/images/boom.png";
			this.playerRealD = 93;
			this.playerImgD = 88;
			
			this.redBulletImg = new Image();	
			this.redBulletImg.src = "/images/redBullet.png";
			this.redBulletRealD = 33;
			this.redBulletD = 28;

			this.greenBulletImg = new Image();
			this.greenBulletImg.src = "/images/greenBullet.png";
			this.greenBulletRealD = 33;
			this.greenBulletD = 28;

		},
		get: function(url){
            var img = new Image();
            if (url != ""){
                img.src = url;
            }
            return img;
        }

	});

	return resources;
});