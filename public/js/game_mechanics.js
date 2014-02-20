var KEY_CODE = {
      LEFT: 37,
      UP: 38,
      RIGHT: 39,
      DOWN: 40,
      SPACE: 32,
    };

var GAME_WIDTH = 1024;
var GAME_HEIGHT = 768;
var PLAYER_WIDTH = GAME_WIDTH/10;
var PLAYER_HEIGHT = GAME_HEIGHT/50;
var PLAYER_START_X = GAME_WIDTH/2 - PLAYER_WIDTH/2;
var PLAYER_START_Y = GAME_HEIGHT - 2*PLAYER_HEIGHT;
var ROCKET_WIDTH = PLAYER_WIDTH/2;
var ROCKET_HEIGHT = PLAYER_HEIGHT/2;
var ROCKET_SPEED = ROCKET_HEIGHT/4;

var MOVE_X = PLAYER_WIDTH/10;

var ROCKETS = [];

function initObject(color, x, y, width, height) {
    this.color = color; // цвет прямоугольника
    this.x = x; // координата х
    this.y = y; // координата у
    this.width = width; // ширина
    this.height = height; // высота
    // функция рисует прямоугольник согласно заданным параметрам
    this.draw = function() {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    };
}

function draw(){
    game.draw();
    player.draw();
    drawAllRockets();
}

function deleteRocket(index)
{
    ROCKETS.splice(index, 1);
}

function drawAllRockets(){
    for (var i = 0; i < ROCKETS.length; i++)
    {
        if (ROCKETS[i].y + ROCKET_HEIGHT <= 0)
        {
            deleteRocket(i); 
        }
        ROCKETS[i].draw();
    };
}

function update(){
    for (var i = 0; i < ROCKETS.length; i++)
    {
        ROCKETS[i].y -= ROCKET_SPEED;

    };
    console.log(ROCKETS.length);
}

function play(){
    draw();
    update();
}

function damageRocket(){
    ROCKETS.push(new initObject("#ffffff", player.x, player.y, 
        ROCKET_WIDTH, ROCKET_HEIGHT));
}

function movePlayer(event){
    switch(event.keyCode) {
        case KEY_CODE.LEFT:
            if (player.x > 0)
            {
                player.x -= MOVE_X;
            }
        break;
        case KEY_CODE.RIGHT:
            if (player.x + PLAYER_WIDTH < GAME_WIDTH)
            {
                player.x += MOVE_X;
            }
        break;
        case KEY_CODE.UP:
            damageRocket();
        break;
      
    }
}

function init() {
    start = false;
    // объект игрового поля
    game = new initObject("#000", 0, 0, GAME_WIDTH, GAME_HEIGHT);
    // объект игрок
    player = new initObject("#ffffff", PLAYER_START_X, PLAYER_START_Y, 
        PLAYER_WIDTH, PLAYER_HEIGHT);
    //холст
    var canvas = document.getElementById("game");
    canvas.width = game.width;
    canvas.height = game.height;
    context = canvas.getContext("2d");
    //window.addEventListener('keydown', movePlayer, false);
    window.addEventListener('keypress', movePlayer, false);
    //window.addEventListener('keyup', movePlayer, false);

    setInterval(play, 1000 / 50);
}



init();