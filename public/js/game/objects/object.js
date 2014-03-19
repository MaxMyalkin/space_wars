define(['classy',
	'game/sprite'], 
function(Class,
	Sprite
	){
	var AbstractObject = Class.$extend({
		__init__: function(color, x, y, resource){
			this.color = color; 
    		this.x = x; 
    		this.y = y; 	
    		if (resource != undefined) { 
                this.resource = resource;
                this.radius = resource.radius;
            }
		},

		draw: function(context) {
                if (context.debug === true)
                    this.drawCircle(context);

                if(this.resource != undefined)
                {
                	if (this.deltaAngle != 0) {
	                    context.save();
	                    context.translate(this.x, this.y);
	                    this.Angle += this.deltaAngle;
	                    context.rotate(this.Angle*Math.PI/180);
	                    
	                    context.translate(-this.x, -this.y);
	                    this.resource.draw(context , this.x , this.y);
	                    context.restore(); 
                	}
                	else
                		this.resource.draw(context , this.x , this.y);
                }
                
    	},
        
    	initMotion: function(speedX, speedY){
    		this.speedX = speedX;
            this.speedY = speedY;
    	},	

        initRotation: function(startAngle, delta){
            this.Angle = startAngle;
            this.deltaAngle = delta;
        },

        drawCircle: function(context){
            context.fillStyle = this.color;
            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0 , 2 * Math.PI , false );
            context.fill();
        }

	});

    return AbstractObject;
});