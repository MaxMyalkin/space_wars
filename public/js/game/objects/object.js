define(['classy',
	'game/sprite'], 
function(Class,
	Sprite
	){
	var AbstractObject = Class.$extend({
		__init__: function(color, x, y, radius, img){
			this.color = color; 
    		this.x = x; 
    		this.y = y; 
    		this.radius = radius;
    		if (img != undefined) { 
                this.img = img;
            }
		},

		draw: function(context, x, y) {
                if (x == undefined)
                    x = 0;
                if (y == undefined)
                    y = 0;
                
                if (context.debug === true)
                    this.drawCircle(context);
                
                if (this.sprite != undefined){
                    this.sprite.render(context , this.x - this.radius + x, this.y - this.radius + y );
                    return;
                }

                if (this.deltaAngle != 0){
                    context.save();
                    context.translate(this.x, this.y);
                    this.Angle += this.deltaAngle;
                    context.rotate(this.Angle*Math.PI/180);
                    context.translate(-this.x, -this.y);
                    context.drawImage(this.img, this.x - this.radius + x, this.y - this.radius + y);
                    context.restore();
                    return;
                }
                context.drawImage(this.img, this.x - this.radius + x, this.y - this.radius + y);
            
    	},
        
    	initMotion: function(speedX, speedY){
    		this.speedX = speedX;
            this.speedY = speedY;
    	},	

    	initAnimation: function(src , sizeX , sizeY , speed , frames, direction, once) {
    		this.sprite = new Sprite(src, sizeX , sizeY, speed, frames, direction, once);
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