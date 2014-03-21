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

			this.playerLeft = new Resource(73 ,"/images/shipLeft.png" , true , 0 , 20 , 0.3, 146 , 174 , false , [0 , 1 , 2 , 3 , 4, 3, 2, 1] , true);

			this.playerRight = new Resource(73 ,"/images/shipRight.png" , true , 0 , 20 , 0.3 , 146 , 174 , false , [0 , 1 , 2 , 3 , 4, 3, 2, 1] , true);

			this.playerDirect = new Resource(73 , "/images/shipDirect.png" , true , 0 , 20 , 0.3 , 146 , 174 , false , [0 , 1 , 2 , 3 , 4, 3, 2, 1] , true);
			
			this.firstTypeBang = new Resource(42 ,"/images/explosions.png" , true , 0 , 0 , 0.25 , 84 , 84 , true , [0 , 1 , 2 , 3 , 4 , 5 , 6] , true);

			this.firstTypeBonus = new Resource(20 , "/images/firstbonus.png" , false , 10 , -5);
			
			this.secondTypeBonus = new Resource(20 , "/images/secondbonus.png" , false , 10 , 0);
			
			this.attackSound = new Sound("/sounds/attack.ogg", 5);

			this.bangSound = new Sound("/sounds/boom.ogg", 5);

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
            		return new Resource(46 ,"/images/bang1.png" , true , 0 , 0 , 0.5 , 96 , 94 , true , [0 , 1 , 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9 , 10 , 11 , 12 , 13 , 14] , true);
            	break;
            	case "secondTypeBang":
            		return new Resource(32 ,"/images/bang2.png" , true , 0 , 0 , 0.4 , 81 , 62 , true , [0 , 1 , 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9] , true);
            	break;
            	case "thirdTypeBang":
            		return new Resource(50 ,"/images/bang3.png" , true , 0 , 0 , 0.4 , 93 , 100 , true , [0 , 1 , 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9 , 10 , 11 , 12 , 13 , 14 , 15 , 16 , 17 , 18 , 19, 20, 21 , 22 , 23 , 24 , 25 , 26 , 27 , 28 , 29] , true);
            	break;
            }
        }

	});

	return resources;

});