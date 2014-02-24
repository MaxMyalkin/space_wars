define([
], function(){
	function init() {
	    start = false;
	    // объект игрового поля
	    //game = new initObject("#000", 0, 0, GAME_WIDTH, GAME_HEIGHT);
	    // объект игрок
	    player = new initObject("#ffffff", PLAYER_START_X, PLAYER_START_Y, 
	        PLAYER_WIDTH, PLAYER_HEIGHT);
	    player.initMotion(MOVE_X, 0);
	    //холст
	    var canvas = document.getElementById("game");
	    canvas.width = GAME_WIDTH;
	    canvas.height = GAME_HEIGHT;
	    context = canvas.getContext("2d");
	    window.addEventListener('keydown', movePlayer, false);
	    //window.addEventListener('keypress', movePlayer, false);
	    //window.addEventListener('keyup', movePlayer, false);
	    canvas.onclick = startGame;
	    //var restart = document.getElementById("restart");
	    //restart.onclick = restart;
	    setInterval(play, 1000 / DELAY);
	}

	return new init();
};