define(['game/objects/object'
 ], 
function(AbstractObject
 ){
	var BigBang = AbstractObject.$extend({
		__init__: function(color, x, y, radius, src){
			this.$super(color, x, y, radius, "");
    		this.initAnimation(src, 84, 84 , 0.25, [0, 1, 2, 3, 4, 5, 6], "", true);
		}
	});

	return BigBang;
});