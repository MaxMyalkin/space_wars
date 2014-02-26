define(['game/objects/object'], 
function(AbstractObject){
	var Bonus = AbstractObject.$extend({
		__init__: function(color, x, y, resources, constSpeed ){
			
			this.$super(color, x, y, radius, src);
    		this.initMotion(0 , constSpeed);	
		}
	});

	return Bonus;
});