define(['game/objects/object'], 
function(AbstractObject){
	var Bonus = AbstractObject.$extend({
		__init__: function(color, x, y, resources){ 
			this.$super(color, x, y, resources.bonusImgD, resources.bonusImg);
    		this.initRotation(0,3);	
    		this.initMotion(0, 0);
    		this.time = 0;
		}
	});
	return Bonus;
});