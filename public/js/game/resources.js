define(['classy',
	'game/audio',
	'game/objects/resource',
 ], 
function(Class, 
	Sound, 
	Resource
 ){
	var resources = Class.$extend({
		__init__: function(){

//radius, src , isAnimation , dx , dy , speed , width , height , singleAnimation , frames
			this.smallAsteroid = new Resource(23 ,"/images/smallAsteroid.png" , false , 0 , 2);

			this.bigAsteroid = new Resource(47 ,"/images/bigAsteroid.png" , false , 0 , 0);

			this.mediumAsteroid = new Resource(40 , "/images/mediumAsteroid.png" , false , 0 , 0);

			this.playerLeft = new Resource(47 ,"/images/shipLeft.png" , true , 0 , 20 , 0.3 , 95 , 100 , false , [0 , 1 , 2 , 3] , true);

			this.playerRight = new Resource(47 ,"/images/shipRight.png" , true , 0 , 20 , 0.3 , 95 , 100 , false , [0 , 1 , 2 , 3] , true);

			this.playerDirect = new Resource(47 , "/images/shipDirect.png" , true , 0 , 20 , 0.3 , 95 , 100 , false , [0 , 1 , 2 , 3] , true);
			
			this.firstTypeBullet = new Resource(12 ,"/images/rocket.png" , true , 0 , -2 , 0.3 , 20 , 50 , false , [4 , 5 , 6 , 7] , false);	

			this.secondTypeBullet = new Resource(12 , "/images/rocket.png" , true , -2 , 0 , 0.3 , 20 , 50 , false , [0 , 1 , 2 , 3] , false);
			
			this.thirdTypeBullet = new Resource(12 ,"/images/rocket.png" , true , -2 , 0 , 0.3 , 20 , 50 , false , [4 , 5 , 6 , 7] , false);

			this.firstTypeBang = new Resource(42 ,"/images/explosions.png" , true , 0 , 0 , 0.25 , 84 , 84 , true , [0 , 1 , 2 , 3 , 4 , 5 , 6] , true);

			this.firstTypeBonus = new Resource(20 , "/images/firstbonus.png" , false , 10 , -5);
			
			this.secondTypeBonus = new Resource(20 , "/images/secondbonus.png" , false , 10 , 0);
			
			this.attackSound = new Sound("/sounds/attack.mp3", 5);

			this.bangSound = new Sound("/sounds/boom.mp3", 5);

		},

		//Анимированные ресурсы
		get: function(resource){
            switch(resource){
            	case "firstTypeBullet":
            		return new Resource(12 ,"/images/rocket.png" , true , 0 , -2 , 0.3 , 20 , 50 , false , [4 , 5 , 6 , 7] , false);
            	break;
            	case "secondTypeBullet":
            		return new Resource(12 , "/images/rocket.png" , true , -2 , 0 , 0.3 , 20 , 50 , false , [0 , 1 , 2 , 3] , false);
            	break;
            	case "thirdTypeBullet":
            		return new Resource(12 ,"/images/rocket.png" , true , -2 , 0 , 0.3 , 20 , 50 , false , [4 , 5 , 6 , 7] , false);
            	break;
            	case "firstTypeBang":
            		return new Resource(42 ,"/images/explosions.png" , true , 0 , 0 , 0.25 , 84 , 84 , true , [0 , 1 , 2 , 3 , 4 , 5 , 6] , true);
            	break;
            	case "secondTypeBang":
            		return new Resource(42 ,"/images/explosions.png" , true , 0 , 0 , 0.25 , 84 , 84 , true , [0 , 1 , 2 , 3 , 4 , 5 , 6] , true);
            	break;
            	case "thirdTypeBang":
            		return new Resource(42 ,"/images/explosions.png" , true , 0 , 0 , 0.25 , 84 , 84 , true , [0 , 1 , 2 , 3 , 4 , 5 , 6] , true);
            	break;
            }
        }

	});

	return resources;

});