define(['game/objects/object'
 ], 
function(AbstractObject
 ){
	var BigBang = AbstractObject.$extend({
		__init__: function(color, x, y, resources){
			this.$super(color, x, y, resources.firstTypeBang);
		}
	});

	return BigBang;
});