define(['classy'
 ], 
function(Class
 ){
	var resources = Class.$extend({
		__init__: function(){
			
			this.smallAsteroidImg = new Image();
			this.smallAsteroidImg.src = "/images/smallAsteroid.png";
			this.smallAsteroidRealD = 46;
			this.smallAsteroidImgD = 46;

			this.bigAsteroidImg = new Image();
			this.bigAsteroidImg.src = "/images/bigAsteroid.png";
			this.bigAsteroidImgD = 94;
			this.bigAsteroidRealD = 94;

			this.mediumAsteroidImg = new Image();
			this.mediumAsteroidImg.src = "/images/mediumAsteroid.png";
			this.mediumAsteroidRealD = 80;
			this.mediumAsteroidImgD = 80;

			this.playerLeftImg = new Image();
			this.playerLeftImg.src = "/images/shipLeft.png";

			this.playerRightImg = new Image();
			this.playerRightImg.src = "/images/shipRight.png";

			this.playerImg = new Image();
			this.playerImg.src = "/images/shipDirect.png";
			this.playerRealD = 95;
			this.playerImgD = 95;
			
			this.redBulletImg = new Image();	
			this.redBulletImg.src = "/images/rocket.png";
			this.redBulletRealD = 20;//33;
			this.redBulletD = 12;//28;

			this.bigBangImg = new Image();
			this.bigBangImg.src = "/images/explosions.png";
			this.bigBangRealD = 84;
			this.bigBangD = 84;

			this.greenBulletImg = new Image();
			this.greenBulletImg.src = "/images/rocket.png";
			this.greenBulletRealD = 20;
			this.greenBulletD = 12;

			this.bonusImg = new Image();
			this.bonusImg.src = "/images/bonus.png";
			this.bonusRealD = 20;
			this.bonusImgD = 12;

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