define(['game/objects/object'], 
function(AbstractObject){
	var Bonus = AbstractObject.$extend({
		__init__: function(color, x, y, resources , type){ 
			this.type = type;
			switch(this.type){
				case 1:
					src = resources.bonusImg;
					radius = resources.bonusImgD/2;
					break;
				case 2:
					src = resources.bonus2Img;
					radius = resources.bonus2ImgD/2;
					break;
				default:
					break;
			}		

			this.$super(color, x, y, radius, src);
    		this.initRotation(0,3);	
    		this.initMotion(0, 0);
    		this.time = 0;
		}
	});
	return Bonus;
});