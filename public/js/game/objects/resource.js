define(['classy',
        'game/sprite'
    ],
    function(Class,
        Sprite
    ) {
        var Resource = Class.$extend({
            __init__: function(radius, src, isAnimation, dx, dy, speed, width, height, singleAnimation, frames, isHorizontal) {
                this.radius = radius;
                this.isAnimation = isAnimation;
                this.img = new Image();
                this.img.src = src;
                if (isAnimation) {
                    if (speed === undefined)
                        speed = 0;
                    if (width === undefined)
                        width = 0;
                    if (height === undefined)
                        height = 0;
                    if (singleAnimation === undefined)
                        singleAnimation = false;
                    if (frames === undefined)
                        frames = [];
                    if (isHorizontal === undefined)
                        isHorizontal = true;
                    this.sprite = new Sprite(this.img, width, height, speed, frames, isHorizontal, singleAnimation);
                }
                if (dx === undefined)
                    dx = 0;
                if (dy === undefined)
                    dy = 0;
                this.dx = dx;
                this.dy = dy;
            },

            draw: function(context, posX, posY) {
                if (this.isAnimation)
                    this.sprite.render(context, posX, posY, this.radius, this.dx, this.dy);
                else {
                    context.drawImage(this.img, posX - this.radius + this.dx, posY - this.radius + this.dy);
                }
            }
        });

        return Resource;
    });