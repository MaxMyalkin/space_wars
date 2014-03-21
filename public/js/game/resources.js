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
			this.smallAsteroid = new Resource(23 ,"/images/asteroid/smallAsteroid.png" , false , 0 , 2);

			this.bigAsteroid = new Resource(47 ,"/images/asteroid/bigAsteroid.png" , false , 0 , 0);

			this.mediumAsteroid = new Resource(40 , "/images/asteroid/mediumAsteroid.png" , false , 0 , 0);

			this.player = [
				[	
					new Resource(47 , "/images/ship/second/direct.png" , true , 0 , 20 , 0.3 , 95 , 100 , false , [0 , 1 , 2 , 3] , true),
					new Resource(47 ,"/images/ship/second/left.png" , true , 0 , 20 , 0.3 , 95 , 100 , false , [0 , 1 , 2 , 3] , true),
					new Resource(47 ,"/images/ship/second/right.png" , true , 0 , 20 , 0.3 , 95 , 100 , false , [0 , 1 , 2 , 3] , true)
				],
				[
					new Resource(73 , "/images/ship/first/direct.png" , true , 0 , 20 , 0.3 , 146 , 174 , false , [0 , 1 , 2 , 3 , 4, 3, 2, 1] , true),
					new Resource(73 ,"/images/ship/first/left.png" , true , 0 , 20 , 0.3, 146 , 174 , false , [0 , 1 , 2 , 3 , 4, 3, 2, 1] , true),
					new Resource(73 ,"/images/ship/first/right.png" , true , 0 , 20 , 0.3 , 146 , 174 , false , [0 , 1 , 2 , 3 , 4, 3, 2, 1] , true)
				]
			];

			this.firstTypeBonus = new Resource(20 , "/images/bullet/firstbonus.png" , false , 10 , -5);
			
			this.secondTypeBonus = new Resource(20 , "/images/bullet/secondbonus.png" , false , 10 , 0);
			
			this.attackSound = new Sound("/sounds/attack.ogg", 5);

			this.bangSound = new Sound("/sounds/boom.ogg", 5);

		},

		//Анимированные ресурсы
		get: function(resource){
            switch(resource){
            	case "firstTypeBullet":
            		return new Resource(12 ,"/images/bullet/rocket.png" , true , 0 , -2 , 0.3 , 20 , 50 , false , [4 , 5 , 6 , 7] , false);
            	break;
            	case "secondTypeBullet":
            		return new Resource(12 , "/images/bullet/rocket.png" , true , -2 , 0 , 0.3 , 20 , 50 , false , [0 , 1 , 2 , 3] , false);
            	break;
            	case "thirdTypeBullet":
            		return new Resource(12 ,"/images/bullet/rocket.png" , true , -2 , 0 , 0.3 , 20 , 50 , false , [4 , 5 , 6 , 7] , false);
            	break;
            	case "firstTypeBang":
            		return new Resource(46 ,"/images/bang/bang1.png" , true , 0 , 0 , 0.5 , 96 , 94 , true , [0 , 1 , 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9 , 10 , 11 , 12 , 13 , 14] , true);
            	break;
            	case "secondTypeBang":
            		return new Resource(32 ,"/images/bang/bang2.png" , true , 0 , 0 , 0.4 , 81 , 62 , true , [0 , 1 , 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9] , true);
            	break;
            	case "thirdTypeBang":
            		return new Resource(50 ,"/images/bang/bang3.png" , true , 0 , 0 , 0.4 , 93 , 100 , true , [0 , 1 , 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9 , 10 , 11 , 12 , 13 , 14 , 15 , 16 , 17 , 18 , 19, 20, 21 , 22 , 23 , 24 , 25 , 26 , 27 , 28 , 29] , true);
            	break;
            }
        }

	});

	return resources;

});