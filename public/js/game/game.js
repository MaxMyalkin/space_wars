define(['classy', 'game/objects/player', 'game/mechanics', 'game/resources'], 
function(Class, Player, GameMechanic, Resources){
 /* TODO multiplayer
        bigbang on collision 
        animation
        rotate asteroids
        bonuses
        resource manager
         */
    var Game = Class.$extend({
         
        __init__: function (){
            this.resources = new Resources();
            //Константы
            this.DELAY = 50;
            this.GAME_WIDTH = 1024;
            this.GAME_HEIGHT = 768;
            
            this.PLAYER_RADIUS = this.resources.playerImgD/2;
            this.PLAYER_START_X = this.GAME_WIDTH/2;
            this.PLAYER_START_Y = this.GAME_HEIGHT - this.PLAYER_RADIUS;
            this.ROCKET_SPEED = 30;
            this.ASTEROID_SPEED = 5;

            this.FONT_SIZE = 50;
            this.MOVE_X = 10;
            this.ASTEROID_TIMEOUT = 50;
 
            //Переменные
            this.timer = 0;         
            this.firstTime = true;
            this.startTime = false;
            this.pauseFlag = false;
            this.gameover = false;
            this.stopped = true;
            this.asteroids = [];
            this.keydown = [];
            this.gameMechanic = new GameMechanic();
            var canvas = document.getElementById("game");
            canvas.width = this.GAME_WIDTH;
            canvas.height = this.GAME_HEIGHT;
            this.context = canvas.getContext("2d");
            this.context.fillStyle = "#ffffff";
            this.player = new Player("#ffffff", this.PLAYER_START_X, this.PLAYER_START_Y, 
                this.PLAYER_RADIUS, this.resources.playerImg, this.MOVE_X, 0);
 
            var game = this;
            $(document).bind("keydown", function(event) {
                game.keydown[String.fromCharCode(event.which).toLowerCase()] = true;
            });
             $(document).bind("keyup", function(event) {
                game.keydown[String.fromCharCode(event.which).toLowerCase()] = false;
            });

            this.restart = document.getElementById("restart");
            this.restart.onclick = this.restartGame.bind(game);
            this.pauseBtn = document.getElementById("pause");
            this.pauseBtn.onclick = this.pauseGame.bind(game);
            this.backBtn = document.getElementById("backBtn");
            this.backBtn.onclick = this.endGame.bind(game);
            setInterval(function(){ game.play(); game.movePlayer(); }, 1000 / this.DELAY);
           	this.setBtnText();
        },
 		


        setBtnText: function() {
        	
        	if (this.pauseFlag) {
        		this.pauseBtn.innerHTML = "Continue";
        	}
        	else {
        		this.pauseBtn.innerHTML = "Pause";
        	}
        	if (this.gameover) {
        		this.restart.innerHTML = "Restart";
        	}
        	if(this.stopped){
        		this.restart.innerHTML = "Play";
        	}
        	else {
        		this.restart.innerHTML = "Restart";	
        	}
        },

        movePlayer: function (){
 
            if (/*this.startTime === true*/ !this.gameover && !this.pauseFlag && !this.stopped ){
                if (this.keydown["a"]) {
                        if (this.player.x  - this.player.radius > 0){
                            this.player.x -= this.player.speedX;
                            this.player.img.src = this.resources.playerLeftImg;
                        }
                }
                if (this.keydown["d"]){
                    if (this.player.x + this.player.radius < this.GAME_WIDTH){
                            this.player.x += this.player.speedX;
                            this.player.img.src = this.resources.playerRightImg;
                    }
                }
                if (this.keydown["w"]){
                    if (this.gameMechanic.howManyBullets(this.player.bullets, this.GAME_HEIGHT, 0.5) < 1){
                        this.player.launchBullet(this);
                    }
                }
                if (!this.keydown["a"] && !this.keydown["d"]){
                    this.player.img.src = this.resources.playerImg;
                }
            }
        },
 
        restartGame: function(){
        	this.endGame();
            this.gameover = false;
            this.pauseFlag = false;
            this.stopped = false;
            this.setBtnText();
        },
 
        pauseGame: function(){
	            if(!this.gameover && !this.stopped){
		            if (this.pauseFlag ){
		                this.pauseFlag = false;
		            }
		            else {
		                this.pauseFlag = true;
		            }
	            }
	            this.setBtnText();    
        }, 
 
        play: function(){
            if (/*this.startTime == true*/ !this.gameover && !this.pauseFlag && !this.stopped) {
                this.timer += 1;
                this.draw();       
                this.gameMechanic.update(this);
            }
            else 
            {
				this.context.clearRect(0, 0, this.GAME_WIDTH, this.GAME_HEIGHT);
		        this.context.font = "bold " + this.FONT_SIZE + "px sans-serif"; 
	            if(this.stopped)
	            {
		            this.context.fillText("Click play" ,this.GAME_WIDTH / 2 - this.FONT_SIZE * 3, this.GAME_HEIGHT / 2);
	            }
	            else
	            	if(this.pauseFlag) {
	            		this.context.fillText("Game Paused" ,this.GAME_WIDTH / 2 - this.FONT_SIZE * 3, this.GAME_HEIGHT / 2);
	            	}
	            	else
	            		if(this.gameover){
	            			this.context.fillText("gameover" ,this.GAME_WIDTH / 2 - this.FONT_SIZE * 3, this.GAME_HEIGHT / 2);
	            		}
	            }
        },
 
        draw: function(){
            this.context.clearRect(0, 0, this.GAME_WIDTH, this.GAME_HEIGHT);
            this.player.draw(this.context);
            this.context.font = "bold " + this.FONT_SIZE + "px sans-serif";
            this.gameMechanic.drawObjects(this.player.bullets, this.GAME_HEIGHT, this.context);
            this.gameMechanic.drawObjects(this.asteroids, this.GAME_HEIGHT, this.context);  
            this.context.fillText("Score: " + this.player.score, 10, this.FONT_SIZE * 1.1);
            this.context.fillText("0" , this.GAME_WIDTH - this.FONT_SIZE * 2 , this.FONT_SIZE * 1.1);
        },
 
        endGame: function(){
	            this.timer = 0;
	            //this.startTime = false;
	            //this.firstTime = false;
	            this.player.score = 0;
	            this.player.x = this.PLAYER_START_X;
	            this.player.y = this.PLAYER_START_Y;
	            while (this.asteroids.length > 0)
	            {
	                this.gameMechanic.deleteObject(this.asteroids, 0);   
	            }
	            while (this.player.bullets.length > 0)
	            {
	                this.gameMechanic.deleteObject(this.player.bullets, 0);   
	            }
	            while (this.keydown.length > 0)
	            {
	                this.keydown.deleteObject(this.keydown, 0);   
	            }
	            this.context.clearRect(0, 0, this.GAME_WIDTH, this.GAME_HEIGHT);
	            this.context.font = "bold " + this.FONT_SIZE + "px sans-serif"; 
	            this.context.fillText("GAME OVER" ,this.GAME_WIDTH / 2 - this.FONT_SIZE * 2.5, this.GAME_HEIGHT / 2);
	            this.gameover = true;
	            this.setBtnText();    
        }
 
    });
     
    return Game;
});
