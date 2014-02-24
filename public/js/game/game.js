define(['classy', 'game/objects/player', 'game/mechanics'], 
function(Class, Player, GameMechanic){
	
	var KeyCode = Class.$extend({
		__init__: function (){
			this.left = 37,
			this.right = 39,
			this.fire = 17
		}
	});

	var Game = Class.$extend({
		
		__init__: function (){


			this.DELAY = 50,
			this.GAME_WIDTH = 1024,
			this.GAME_HEIGHT = 768,
			this.PLAYER_WIDTH = this.GAME_WIDTH/10,
			this.PLAYER_HEIGHT = this.GAME_HEIGHT/50,
			this.PLAYER_START_X = this.GAME_WIDTH/2 - this.PLAYER_WIDTH/2,
			this.PLAYER_START_Y = this.GAME_HEIGHT - 2 * this.PLAYER_HEIGHT,
			this.ROCKET_WIDTH = this.PLAYER_HEIGHT/2,
			this.ROCKET_HEIGHT = this.PLAYER_WIDTH/10,
			this.ROCKET_SPEED = 10,
			this.ASTEROID_HEIGHT = this.GAME_HEIGHT/15,
			this.ASTEROID_WIDTH = this.GAME_WIDTH/15,
			this.ASTEROID_SPEED = 20,
			this.SCORE_FONT_SIZE = 50,
			this.SCORE_Y = this.SCORE_FONT_SIZE * 1.1,
			this.SCORE_X = this.SCORE_FONT_SIZE * 1.1,
			this.MOVE_X = 10,
			this.ASTEROID_TIMEOUT = 50







			this.gameMechanic = new GameMechanic();
			this.keys = new KeyCode();
			this.timer = 0;	        
			this.firstTime = true;
			this.startTime = false;
			this.pauseFlag = false;
			this.asteroids = [];
			this.player = new Player("#ffffff", this.PLAYER_START_X, this.PLAYER_START_Y, 
		    	this.PLAYER_WIDTH, this.PLAYER_HEIGHT, "", this.MOVE_X, 0);
			var canvas = document.getElementById("game");
		    canvas.width = this.GAME_WIDTH;
		    canvas.height = this.GAME_HEIGHT;
		    this.context = canvas.getContext("2d");
		    this.context.fillStyle = "#ffffff";
		    //window.addEventListener('keydown', movePlayer, false);
		    var restart = document.getElementById("restart");
		    restart.onclick = this.restartGame;
		    var pause = document.getElementById("pause");
		    pause.onclick = this.pauseGame;
		    var backBtn = document.getElementById("backBtn");
		    backBtn.onclick = this.endGame;
		    if (this.firstTime == true)
		    {
		        setInterval(this.play, 1000 / this.DELAY);
		    }
	    },

		movePlayer: function (event){
		    if (this.startTime === true ){
		        switch(event.keyCode) {
		            case this.keys.left:
		                if (this.player.x > 0){
		                    this.player.x -= this.player.speedX;
		                }
		            	break;
		            case this.keys.right:
		                if (this.player.x + this.player.width < this.GAME_WIDTH){
		                    this.player.x += this.player.speedX;
		                }
		            	break;
		            case this.keys.fire:
		                //openFire();
		            	break;
		        }
		    }
		    return false;
		},

	    restartGame: function(){
	    	alert("restart");
    		this.startTime = true;
	    	//this.endGame();
	    },
/*
	    pauseGame: function(){
	    	var pauseBtn = document.getElementById("pause");
		    if (this.pauseFlag === true){
		        this.start = true;
		        this.pauseFlag = false;
		        pauseBtn.text = "Pause";
		    }
		    else {
		        pauseBtn.text = "Play";
		        this.start = false;
		        this.pauseFlag = true;
		    }
	    },
*/
	    play: function(){
	    	console.log(this.startTime);
	    	console.log(this.ASTEROID_TIMEOUT);
	    	console.log(this.pauseFlag);
	    	//if (this.startTime == true) {

	    		alert("play");
		        this.timer += 1;
		        this.draw();
		        alert("draw");
		        this.gameMechanic.update(this);
		        console.log(this.timer);
		    //}
	    },


	    draw: function(){
	    	this.context.clearRect(0, 0, this.GAME_WIDTH, this.GAME_HEIGHT);
		    this.player.draw(this.context);
		    this.context.font = "bold " + this.SCORE_FONT_SIZE + "px sans-serif";
		    this.context.fillText(this.player.score, this.SCORE_X, this.SCORE_Y);
		    this.gameMechanic.drawObjects(this.player.bullets, this.GAME_HEIGHT);
		 	this.gameMechanic.drawObjects(this.asteroids, this.GAME_HEIGHT);  
	    },
/*
		endGame: function(){
			alert("ok");
			this.timer = 0;
		    this.start = false;
		    this.firstTime = false;
		    this.player.score = 0;
		    while (this.asteroids.length > 0)
		    {
		        this.gameMechanic.deleteObject(this.asteroids, 0);   
		    }
		    while (this.player.bullets.length > 0)
		    {
		        this.gameMechanic.deleteObject(this.bullets, 0);   
		    }
		}
*/
	});
 	
 	return Game;
});
