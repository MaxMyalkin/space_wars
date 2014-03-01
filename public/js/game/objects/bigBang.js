define(['game/objects/object'
 ], 
function(AbstractObject
 ){
	var BigBang = AbstractObject.$extend({
		__init__: function(color, x, y, radius, src){
			this.$super(color, x, y, radius, "");
    		this.initAnimation(src, 95, 100 ,0.3, [0,1,2,3]);
		}
	});

	return BigBang;
});