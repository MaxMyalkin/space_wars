define([
], function(){
var DELAY = 50;
var KEY_CODE = {
      LEFT: 37,
      UP: 38,
      RIGHT: 39,
      DOWN: 40,
      SPACE: 32,
      CTRL: 17
    };

var GAME_WIDTH = 1024;
var GAME_HEIGHT = 768;
var PLAYER_WIDTH = GAME_WIDTH/10;
var PLAYER_HEIGHT = GAME_HEIGHT/50;
var PLAYER_START_X = GAME_WIDTH/2 - PLAYER_WIDTH/2;
var PLAYER_START_Y = GAME_HEIGHT - 2*PLAYER_HEIGHT;
var ROCKET_WIDTH = PLAYER_HEIGHT/2;
var ROCKET_HEIGHT = PLAYER_WIDTH/10;
var ROCKET_SPEED = ROCKET_HEIGHT/2;
var ASTEROID_HEIGHT = GAME_HEIGHT/15;
var ASTEROID_WIDTH = GAME_WIDTH/15;
var ASTEROIDS_SPEED = GAME_HEIGHT/200;

var SCORE_FONT_SIZE = 50;
var SCORE_Y = SCORE_FONT_SIZE * 1.1;
var SCORE_X = SCORE_FONT_SIZE * 1.1;

var MOVE_X = PLAYER_WIDTH/10;

var ROCKETS = [];
var ASTEROIDS = [];

var timer = 0;
var ASTEROIDS_TIMEOUT = 50;

var firstTime = true;;

function initObject(color, x, y, width, height) {
    this.color = color; // цвет прямоугольника
    this.x = x; // координата х
    this.y = y; // координата у
    this.width = width; // ширина
    this.height = height; // высота
    //Инициализации параметров движения объекта
    this.initMotion = function(speed_x, speed_y){
        this.speedX = speed_x;
        this.speedY = speed_y;
    }
    this.setScore = function(score){
        this.score = score;
    }
    // функция рисует прямоугольник согласно заданным параметрам
    this.draw = function() {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    };
}

function drawGame(){
    context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    player.draw();
    drawAllObjects(ROCKETS);
    drawAllObjects(ASTEROIDS);
    context.font = "bold " + SCORE_FONT_SIZE + "px sans-serif";
    context.fillText(player.score, SCORE_X, SCORE_Y);
}

function deleteObject(object, index)
{
    object.splice(index, 1);
}

function drawAllObjects(object){
    for (var i = 0; i < object.length; i++)
    {
        object[i].draw();
        if ((object[i].y + object[i].height < 0) 
            || (object[i].y - object[i].height > GAME_HEIGHT))
        {
            deleteObject(object, i); 
        }
    };
}

function createAsteroid(){
    timer = 0;
    var asteroidPosition = Math.random()*(GAME_WIDTH);
    var asteroid = new initObject("#ffffff", 
      asteroidPosition, 0, ASTEROID_WIDTH, 
      ASTEROID_HEIGHT);
    asteroid.initMotion(0, ASTEROIDS_SPEED);
    ASTEROIDS.push(asteroid);
}

function collision(object1, object2){
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

function update(){
    //Создание астероидов
    if (timer == ASTEROIDS_TIMEOUT){
        createAsteroid();
    }

    for (var i = 0; i < ROCKETS.length; i++)
    {
        for (var j = 0; j < ASTEROIDS.length; j++)
        {
            if (collision(ROCKETS[i], ASTEROIDS[j])){
                deleteObject(ROCKETS, i);
                deleteObject(ASTEROIDS, j);
                player.setScore(player.score + 1);
                break;
            }
        }
    }

    for (var i = 0; i < ASTEROIDS.length; i++)
    {
        if (collision(player, ASTEROIDS[i])){
            endGame();
        }
    }

    //Обновление позиции ракет и астероидов
    for (var i = 0; i < ROCKETS.length; i++)
    {
        ROCKETS[i].y -= ROCKETS[i].speedY;
    };
    for (var i = 0; i < ASTEROIDS.length; i++)
    {
        ASTEROIDS[i].y += ASTEROIDS[i].speedY;
    };
}

function play(){
    if (start)
    {
        timer += 1;
        drawGame();
        update();
        console.log(ASTEROIDS.length);
    }
}

function damageRocket(){
    var rocket = new initObject("#ffffff", player.x + player.width/2 - ROCKET_WIDTH/2, 
        player.y, 
        ROCKET_WIDTH, ROCKET_HEIGHT);
    rocket.initMotion(0, ROCKET_SPEED);
    ROCKETS.push(rocket);
}

function movePlayer(event){
    if (start)
        {
        switch(event.keyCode) {
            case KEY_CODE.LEFT:
                if (player.x > 0)
                {
                    player.x -= player.speedX;
                }
            break;
            case KEY_CODE.RIGHT:
                if (player.x + player.width < GAME_WIDTH)
                {
                    player.x += player.speedX;
                }
            break;
            case KEY_CODE.CTRL:
                damageRocket();
            break;
        }
    }
    return false;
}


function init() {
    start = false;
    pauseFlag = false;
    // объект игрового поля
    //game = new initObject("#000", 0, 0, GAME_WIDTH, GAME_HEIGHT);
    // объект игрок
    player = new initObject("#ffffff", PLAYER_START_X, PLAYER_START_Y, 
        PLAYER_WIDTH, PLAYER_HEIGHT);
    player.initMotion(MOVE_X, 0);
    player.setScore(0);
    //холст
    var canvas = document.getElementById("game");
    canvas.width = GAME_WIDTH;
    canvas.height = GAME_HEIGHT;
    context = canvas.getContext("2d");
    window.addEventListener('keydown', movePlayer, false);
    //canvas.keydown = movePlayer;
    var restart = document.getElementById("restart");
    restart.onclick = restartGame;
    var pause = document.getElementById("pause");
    pause.onclick = pauseGame;
    var backBtn = document.getElementById("backBtn");
    backBtn.onclick = endGame;
    if (firstTime === true)
    {
        setInterval(play, 1000 / DELAY);
    }
}
function restartGame(){
    endGame();
    startGame();
}

function pauseGame(){
    var pauseBtn = document.getElementById("pause");
        
    if (pauseFlag === true){
        start = true;
        pauseFlag = false;
        pauseBtn.text = "Pause";
    }
    else{
        pauseBtn.text = "Play";
        start = false;
        pauseFlag = true;
    }
}

function startGame(){
    start = true;
}

function endGame(){
    timer = 0;
    start = false;
    firstTime = false;
    while (ASTEROIDS.length > 0)
    {
        deleteObject(ASTEROIDS, 0);   
    }
    while (ROCKETS.length > 0)
    {
        deleteObject(ROCKETS, 0);   
    }
    player.score = 0;
}   
    return init;
});
