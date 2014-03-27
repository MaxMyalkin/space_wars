define(['classy', 'game/objects/resource'
 ], 
function (Class, Resource){
	var ResourceArray = Class.$extend({

		__init__: function(){
			this.firstTypeBullet = [];
			this.secondTypeBullet = [];
			this.thirdTypeBullet = [];
			this.firstTypeBang = [];
			this.secondTypeBang = [];
			this.thirdTypeBang = [];

			this.currentFirstTypeBullet = 0;
			this.currentSecondTypeBullet = 0;
			this.currentThirdTypeBullet = 0;
			this.currentFirstTypeBang = 0;
			this.currentSecondTypeBang = 0;
			this.currentThirdTypeBang = 0;
		},
		
		set: function(type, resource, times){
		switch(type){
            	case "firstTypeBullet":
            		this.setArray(this.firstTypeBullet, resource, times)
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
		},

		setArray: function(array, resource, times){
			for (var i = 0; i < times; i++){
				this.firstTypeBullet.push(new Resource(12 ,"/images/bullet/rocket.png" , true , 0 , -2 , 0.3 , 20 , 50 , false , [4 , 5 , 6 , 7] , false));
			}	
		},

		getCurrent: function(type){
			switch (type){
				case "firstTypeBullet":
					fi = this.firstTypeBullet[this.currentFirstTypeBullet];
					this.currentFirstTypeBullet += 1;
            		return fi;
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
	
	return new ResourceArray();
});