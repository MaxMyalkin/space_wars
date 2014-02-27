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

		draw: function(context) {
             
                context.fillStyle = this.color;
                context.beginPath();
                context.arc(this.x, this.y, this.radius, 0 , 2 * Math.PI , false );
                context.fill();
               if (this.sprite != undefined){
                    this.sprite.render(context , this.x - this.radius , this.y - this.radius);
                    return;
                }
                context.drawImage(this.img, this.x - this.radius , this.y - this.radius);
            
    	},
        
    	initMotion: function(speedX, speedY){
    		this.speedX = speedX;
            this.speedY = speedY;
    	},	

    	initAnimation: function(src , sizeX , sizeY , speed , frames) {
    		this.sprite = new Sprite(src, sizeX , sizeY, speed, frames);
    	}

	});

    return AbstractObject;
});