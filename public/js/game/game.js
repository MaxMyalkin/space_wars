define(['classy', 'game/objects/player', 'game/mechanics', 'easeljs'], 
function(Class, Player, GameMechanic, easeljs){

	var Game = Class.$extend({
		
		__init__: function (){
			//Константы
			this.DELAY = 50;
			this.GAME_WIDTH = 1024;
			this.GAME_HEIGHT = 768;
			this.PLAYER_WIDTH = 93;
			this.PLAYER_HEIGHT = 93;
			this.PLAYER_START_X = this.GAME_WIDTH/2 - this.PLAYER_WIDTH/2;
			this.PLAYER_START_Y = this.GAME_HEIGHT - 2 * this.PLAYER_HEIGHT + 96;
			this.ROCKET_WIDTH = this.GAME_WIDTH/100;
			this.ROCKET_HEIGHT = this.GAME_HEIGHT/70;
			this.ROCKET_SPEED = 10;
			this.ASTEROID_HEIGHT = 80;
			this.ASTEROID_WIDTH = 80;
			this.ASTEROID_SPEED = 10;
			this.SCORE_FONT_SIZE = 50;
			this.SCORE_Y = this.SCORE_FONT_SIZE * 1.1;
			this.SCORE_X = this.SCORE_FONT_SIZE * 1.1;
			this.MOVE_X = 10;
			this.ASTEROID_TIMEOUT = 50;

			//Переменные
			this.timer = 0;	        
			this.firstTime = true;
			this.startTime = false;
			this.pauseFlag = false;
			this.asteroids = [];
			this.keydown = [];
			this.gameMechanic = new GameMechanic();
			var canvas = document.getElementById("game");
		    canvas.width = this.GAME_WIDTH;
		    canvas.height = this.GAME_HEIGHT;
		    this.context = canvas.getContext("2d");
		    this.context.fillStyle = "#ffffff";

		    this.stage = new easeljs.Stage(canvas);
			this.player = new Player("#ffffff", this.PLAYER_START_X, this.PLAYER_START_Y, 
		    	this.PLAYER_WIDTH, this.PLAYER_HEIGHT, "/images/1.png", this.MOVE_X, 0);
			
			
			//easeljs.Ticker.on("tick", this.tick);

		    var game = this;
		  	$(document).bind("keydown", function(event) {
                game.keydown[String.fromCharCode(event.which).toLowerCase()] = true;
            });
             $(document).bind("keyup", function(event) {
                game.keydown[String.fromCharCode(event.which).toLowerCase()] = false;
            });
		    var restart = document.getElementById("restart");
		    restart.onclick = this.restartGame.bind(game);
		    var pause = document.getElementById("pause");
		    pause.onclick = this.pauseGame.bind(game);
		    var backBtn = document.getElementById("backBtn");
		    backBtn.onclick = this.endGame.bind(game);
		    if (this.firstTime == true)
		    {
		        setInterval(function(){game.play(); game.movePlayer();}, 1000 / this.DELAY);
		    }
		  
	    },

		movePlayer: function (){

		    if (this.startTime === true ){
		        if (this.keydown["a"]) {
		                if (this.player.x > 0){
		                    this.player.x -= this.player.speedX;
		                }
		        }
		        if (this.keydown["d"]){
		        	if (this.player.x + this.player.width < this.GAME_WIDTH){
		                    this.player.x += this.player.speedX;
		            }
		        }
		        if (this.keydown["w"]){
		        	if (this.gameMechanic.howManyBullets(this.player.bullets, this.GAME_HEIGHT, 0.5) < 1){
		        		this.player.launchBullet(this);
		        	}
		        }
		    }
		},

	    restartGame: function(){
	    	this.endGame();
    		this.startTime = true;
	    },

	    pauseGame: function(){
	    	var pauseBtn = document.getElementById("pause");
		    if (this.pauseFlag === true){
		        this.startTime = true;
		        this.pauseFlag = false;
		        pauseBtn.text = "Pause";
		    }
		    else {
		        pauseBtn.text = "Play";
		        this.startTime = false;
		        this.pauseFlag = true;
		    }
	    }, 

	    play: function(){
	    	if (this.startTime == true) {
		        this.timer += 1;
		        this.draw();       
		        this.gameMechanic.update(this);
		    }
	    },

	    draw: function(){
	    	this.context.clearRect(0, 0, this.GAME_WIDTH, this.GAME_HEIGHT);
		    this.player.draw(this.context);
		    this.context.font = "bold " + this.SCORE_FONT_SIZE + "px sans-serif";
		    this.context.fillText(this.player.score, this.SCORE_X, this.SCORE_Y);
		    this.gameMechanic.drawObjects(this.player.bullets, this.GAME_HEIGHT, this.context);
		 	this.gameMechanic.drawObjects(this.asteroids, this.GAME_HEIGHT, this.context);  
	    },

		endGame: function(){;
			this.timer = 0;
		    this.startTime = false;
		    this.firstTime = false;
		    this.player.score = 0;
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
		       
		}

	});
 	
 	return Game;
});
