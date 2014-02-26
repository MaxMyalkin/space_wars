define(['classy', 'game/objects/asteroid'], 
function(Class, Asteroid){
    var GameMechanic = Class.$extend({
        
        deleteObject: function (object, index){
            object.splice(index, 1);
        },

        drawObjects: function (object, gameHeight, context){
            for (var i = 0; i < object.length; i++)
            {
                object[i].draw(context);
                if ((object[i].y + object[i].height < 0) 
                    || (object[i].y - object[i].height > gameHeight))
                {
                    this.deleteObject(object, i); 
                }
            };
        },

        update: function(game){
            if (game.timer == game.ASTEROID_TIMEOUT){
                this.createAsteroid(game);
            }
         
            for (var i = 0; i < game.player.bullets.length; i++)
            {
                for (var j = 0; j < game.asteroids.length; j++)
                {
                    if (this.collision(game.player.bullets[i], game.asteroids[j])){
                        this.deleteObject(game.player.bullets, i);
                        if(game.asteroids[j].health <= 1)
                        {
                            this.deleteObject(game.asteroids, j);
                            game.player.score += 1;
                            break;
                        }
                        else {
                            game.asteroids[j].health -= 1;
                        }
                        
                    
                    }
                }
            }
         
            for (var i = 0; i < game.asteroids.length; i++)  
            {
                if (this.collision(game.player, game.asteroids[i])){
                    game.endGame();
                }
            }
         
            //Обновление позиции ракет и астероидов
            for (var i = 0; i < game.asteroids.length; i++)
            {
                game.asteroids[i].y += game.asteroids[i].speedY;
            }
            for (var i = 0; i < game.player.bullets.length; i++)
            {
                game.player.bullets[i].y -= game.player.bullets[i].speedY;
            }
            
            
        },

        createAsteroid: function(game){
            game.timer = 0;
            var asteroidPosition = Math.random()*(game.GAME_WIDTH);
            var asteroid = new Asteroid("#ffffff", asteroidPosition, 0, 
                game.ASTEROID_RADIUS, game.resources, 0, game.ASTEROID_SPEED); 
            game.asteroids.push(asteroid);
        },

        collision: function(object1, object2){
            if(Math.sqrt(Math.pow(object2.x - object1.x , 2) + Math.pow( object2.y - object1.y , 2) ) < object1.radius + object2.radius ) {
                return true;
            }
            else   {
                return false;
            }
        },

        howManyBullets: function(bullets, height, partOfScreen){
            var result = 0;
            for (var i = 0; i < bullets.length; i++){
                if (bullets[i].y > height*partOfScreen){
                    result++;
                }
            }
            return result;
        }
    });

    return GameMechanic;
});