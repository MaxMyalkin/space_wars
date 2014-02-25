define(['classy'], 
function(Class){
	var AbstractObject = Class.$extend({
		__init__: function(color, x, y, radius, src){
			this.color = color; 
    		this.x = x; 
    		this.y = y; 
    		this.radius = radius; 
    		//this.img = new Image();
            //this.img.src = src;
		},

		draw: function(context) {
            	context.fillStyle = this.color;
                context.beginPath();
            	context.arc(this.x, this.y, this.radius, 0 , 2 * Math.PI , false );
                context.fill();
    	},
        
    	initMotion: function(speedX, speedY){
    		this.speedX = speedX;
            this.speedY = speedY;
    	}	
	});

    return AbstractObject;
});