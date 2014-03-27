define(['classy', 
    'game/objects/player', 
    'game/mechanics', 
    'game/resources',
    'views/gameOver'], 
function(Class, Player, GameMechanic, Resources, GameOver){
 /* TODO 
         */
    var Game = Class.$extend({
         
        __init__: function (){
            this.resources = new Resources();
            //Константы
            this.DELAY = 50;
            this.GAME_WIDTH = 1024;
            this.GAME_HEIGHT = 768;
            this.ROCKET_SPEED = 10;
            this.ASTEROID_SPEED = 5;

            this.FONT_SIZE = 50;
            this.ASTEROID_TIMEOUT = 50;
            this.BULLET_TIMEOUT = 25;
            this.BONUS_TIMEOUT = 500;
 			this.BONUS_TERMINATE = 200 
            //Переменные
            this.bulletTimer = 0;
            this.asteroidTimer = 0;
            this.bonusTimer = 0;         
            this.pauseFlag = false;
            this.stopped = true;
            this.asteroids = [];
            this.keydown = [];
            this.bangs = [];
            this.bonuses = [];
            this.gameMechanic = new GameMechanic();
            var canvas = document.getElementById("gameField");
            canvas.width = this.GAME_WIDTH;
            canvas.height = this.GAME_HEIGHT;
            this.context = canvas.getContext("2d");
            this.context.fillStyle = "#ffffff";
            this.context.debug = false;														//режим отладки перенесен сюда
            this.player = new Player("#ffffff", this.GAME_WIDTH, this.GAME_HEIGHT, 
                 this.resources.player);
                       
            var game = this;
            $(document).bind("keydown", function(event) {
                game.keydown[String.fromCharCode(event.which).toLowerCase()] = true;
            });
             $(document).bind("keyup", function(event) {
                game.keydown[String.fromCharCode(event.which).toLowerCase()] = false;
            });

            this.restart = $("#restart");
            this.restart.click(this.restartGame.bind(game));
            this.pauseBtn = $("#pause");
            this.pauseBtn.click(this.pauseGame.bind(game));
            this.backBtn = $("#backBtn");
            this.backBtn.click(this.endGame.bind(game));
            this.interval;
            this.gameOverForm = new GameOver();
            this.gameover = false;
            this.reloading(true);
           	this.setBtnText();
           	this.setBulletInfo();
           	this.setShipInfo();
           	this.setScore();
        },

        setBtnText: function() {
        	
        	if (this.pauseFlag) {
        		this.pauseBtn.html("Continue");
        	}
        	else {
        		this.pauseBtn.html("Pause");
        	}
        	if(this.stopped){
        		this.restart.html("Play");
        	}
        	else {
        		this.restart.html("Restart");	
        	}
        },

        movePlayer: function (){
 
            if (!this.pauseFlag && !this.stopped ){
                if (this.keydown["a"]) {
                	this.player.move(-this.player.hspeed , 0 , this.GAME_WIDTH , this.GAME_HEIGHT);
                    this.player.resource = this.resources.player[this.player.type][1];
                }
        		if (this.keydown["d"]){
                    this.player.move(this.player.hspeed , 0 , this.GAME_WIDTH , this.GAME_HEIGHT);
                    this.player.resource = this.resources.player[this.player.type][2];
                }
                if (this.keydown["p"]){
                    if (this.bulletTimer > this.BULLET_TIMEOUT){
                        this.player.launchBullet(this , 1);
                        this.bulletTimer = 0;
                    }
                }
                if (!this.keydown["a"] && !this.keydown["d"]){
                    this.player.resource = this.resources.player[this.player.type][0];
                }
                if (this.keydown["w"]) {
                	this.player.move(0 , -this.player.vspeed , this.GAME_WIDTH , this.GAME_HEIGHT);
                }
                if (this.keydown["s"]) {
                	this.player.move(0 , this.player.hspeed , this.GAME_WIDTH , this.GAME_HEIGHT);
                }
                if(this.keydown["q"]) {
                	if( this.bulletTimer > this.BULLET_TIMEOUT && this.player.bonusBullets[0] > 0) {
                		this.player.launchBullet(this , 2);
                		this.bulletTimer = 0;	
                		this.player.bonusBullets[0] -=1;
                		this.setBulletInfo();
                	}
              
                }
                if(this.keydown["e"]) {
                	if( this.bulletTimer > this.BULLET_TIMEOUT && this.player.bonusBullets[1] > 0) {
                		this.player.launchBullet(this , 3);
                		this.bulletTimer = 0;	
                		this.player.bonusBullets[1] -=1;
                		this.setBulletInfo();
                	}
              
                }
                
                if(this.keydown["1"]){
                    this.player.changeTypeOfShip(this.resources.player , 0 , this.GAME_WIDTH , this.GAME_HEIGHT);
                    this.setShipInfo();
                }
                if(this.keydown["2"]){
                    this.player.changeTypeOfShip(this.resources.player , 1 , this.GAME_WIDTH , this.GAME_HEIGHT);
                    this.setShipInfo();    
                }

                if(this.context.debug)
                {
                	if(this.keydown['z']){
                		this.gameover = true;
                		this.endGame();
                	}
                	if(this.keydown['x']){
                		for (var i = this.player.bonusBullets.length - 1; i >= 0; i--) {
                			this.player.bonusBullets[i] += 1;
                		};
                		this.setBulletInfo();
                	}
                }
            }
        },

        reloading: function(flag){
            if (flag){
                var game = this;
                this.interval = setInterval(function(){ game.play(); game.movePlayer(); }, 1000 / this.DELAY);
            }
            else
                clearInterval(this.interval);
        },
 
        restartGame: function(){
            if (this.pauseFlag)
                this.reloading(true);
            this.gameover = false;
        	this.endGame();
            this.pauseFlag = false;
            this.stopped = false;
            this.setBtnText();
        },
 
        pauseGame: function(){
	            if(!this.stopped){
		            if (this.pauseFlag ){
		                this.pauseFlag = false;
                        this.reloading(true);
		            }
		            else {
		                this.pauseFlag = true;
                        this.reloading(false);
                        this.play();
		            }
	            }
	            this.setBtnText();

        }, 
 
        play: function(){
            if ( !this.pauseFlag && !this.stopped && !this.gameover) {
                
                this.asteroidTimer += 1;
                this.bulletTimer += 1;
                this.bonusTimer +=1;
                this.gameMechanic.draw(this);       
                this.gameMechanic.update(this);
                return;
            }
	        this.context.font = "bold " + this.FONT_SIZE + "px sans-serif"; 
            if(this.stopped)
            {
	            this.context.fillText("Click play" ,this.GAME_WIDTH / 2 - this.FONT_SIZE * 3, this.GAME_HEIGHT / 2);
	            return;
       		}
        	if(this.pauseFlag) {
        		this.context.fillText("Game Paused" ,this.GAME_WIDTH / 2 - this.FONT_SIZE * 3, this.GAME_HEIGHT / 2);
        		return;
        	}
        },
 
        endGame: function(){
                if (this.gameover) {
                	this.gameOverForm.show(this.player.score);
                }
	            this.asteroidTimer = 0;
                this.bulletTimer = 0;
	            this.player.score = 0;
	            this.bonusTimer = 0;
	            this.player.bonusBullets = [0 , 0];
	            this.player.setStartPosition(this.GAME_WIDTH , this.GAME_HEIGHT);
	            this.player.changeTypeOfShip(this.resources.player , 0 , this.GAME_WIDTH , this.GAME_HEIGHT);
	            this.asteroids = [];
	            this.player.bullets = [];
	            this.bangs = [];
                this.bonuses = [];
	            this.keydown = [];
                this.setBtnText();
                this.setBulletInfo();
                this.setShipInfo();
                this.setScore();
        },

        setBulletInfo: function() {
        	$('.first-bonus').html(this.player.bonusBullets[0]);
        	$('.second-bonus').html(this.player.bonusBullets[1]);
        },

        setShipInfo: function() {
        	$('#ship-size').html(this.player.resource.radius);
        	$('#ship-hspeed').html(this.player.hspeed);
        	$('#ship-vspeed').html(this.player.vspeed);
        	$('#ship-multiplier').html(this.player.damageMultiplier);
        	$('.first_bullet').attr('src' , '/images/ship/second/info.png');
        	$('.second_bullet').attr('src' , '/images/ship/second/info.png');
        	$('.third_bullet').attr('src' , '/images/ship/second/info.png');
        	switch(this.player.type) {
        		case 0:
        			$('#ship-img').attr('src' , '/images/ship/second/info.png');
        			break;
        		case 1:
        			$('#ship-img').attr('src' , '/images/ship/first/info.png');
        			break;
        	}
        	
        },

        setScore: function() {
        	$('#score').html(this.player.score);
        }
 
    });
     
    return Game;
});
