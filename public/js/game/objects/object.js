define(['classy'], 
function(Class){
	var AbstractObject = Class.$extend({
		__init__: function(color, x, y, width, height, src){
			this.color = color; 
    		this.x = x; 
    		this.y = y; 
    		this.width = width;
    		this.height = height; 
    		this.img = src;
		},
		draw: function(context) {
        	context.fillStyle = this.color;
        	context.fillRect(this.x, this.y, this.width, this.height);
    	},
    	initMotion: function(speedX, speedY){
    		this.speedX = speedX;
            this.speedY = speedY;
    	}	
	});

    return AbstractObject;
});