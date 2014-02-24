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
                        this.deleteObject(game.asteroids, j);
                        game.player.score += 1;
                        break;
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
                game.ASTEROID_WIDTH, game.ASTEROID_HEIGHT, "", 0, game.ASTEROID_SPEED); 
            game.asteroids.push(asteroid);
        },

        collision: function(object1, object2){
            if ((object1.x > object2.x + object2.width) || 
                (object2.x > object1.x + object1.width)) {
                return false;
            }
            if ((object1.y > object2.y + object2.height) ||
                (object2.y > object1.y + object1.height)){
                return false;
            }
            return true;
        }
    });

    return GameMechanic;
});