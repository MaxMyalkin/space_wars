define(['classy',
        'game/objects/player',
        'game/mechanics',
        'game/resources',
        'views/gameOver',
        'lib/Connector',
        'serverFunc'
    ],
    function(Class, Player, GameMechanic, Resources, GameOver, Connection) {
        /* TODO 
 выбор звука в зависимости от браузера
 сделать нормальную загрузку в начале игры
 астероиды разлетаются в стороны при взрыве
 появление одинаковых астероидов
         */

        var Game = Class.$extend({

            __init__: function(resources) {

                var game = this;

                $('#pc').on('click', function() {
                    $('#gameDiv').show();
                    $('.overlay').hide();
                    $('#selectForm').hide();
                    return false;
                });

                $('#smart').click(this.SmartSelection.bind(game));
                _.bindAll(this, "messageRecieved");
                $('#selectFrom').show();
                $('.overlay').show();
                $('#tokenForm').hide();
                $('#gameOver').hide();
                $('#gameDiv').hide();

                this.server = new Connection({
                    server: ['getToken', 'bind'],
                    remote: '/console'
                });

                this.server.on('message', this.messageRecieved);
                this.server.on('reconnect', reconnect.bind(game));
                this.server.on('disconnect', disconnect.bind(game));
                this.server.on('player-joined', function(data) {
                    console.log(data.guid); // guid инициализированной связки
                    localStorage.setItem('guid', data.guid);
                    $('#gameDiv').show();
                    $('#tokenForm').hide();
                    $('.overlay').hide();
                });

                this.resources = resources;

                this.prevX = 0;
                this.prevY = 0;
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
                this.BONUS_TERMINATE = 200;
                //Переменные
                this.level = 1;
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
                this.context.debug = true; //режим отладки перенесен сюда
                this.player = new Player("#ffffff", this.GAME_WIDTH, this.GAME_HEIGHT,
                    this.resources.player);


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
                this.backBtn.click(
                    function() {
                        $('#selectForm').show();
                        $('#gameDiv').hide();
                        game.context.clearRect(0, 0, game.GAME_WIDTH, game.GAME_HEIGHT);
                        game.endGame.bind(game);
                        game.stopped = true;
                        game.setBtnText();
                    }
                );

                this.interval;
                this.gameOverForm = new GameOver();
                this.gameover = false;
                this.reloading(true);
                this.setBtnText();
                this.setScore();
            },

            SmartSelection: function() {
                init.call(this);
                var self = this;
                var tokenForm = $('#tokenForm');
                var selectForm = $('#selectForm');
                selectForm.hide();
            },

            setBtnText: function() {
                if (this.pauseFlag) {
                    this.pauseBtn.html("Continue");
                } else {
                    this.pauseBtn.html("Pause");
                }
                if (this.stopped) {
                    this.restart.html("Play");
                } else {
                    this.restart.html("Restart");
                }
            },


            messageRecieved: function(data, answer) {
                var game = this;
                if (data.type === 'pause') {
                    this.pauseGame();
                    answer(this.pauseFlag);
                }

                if (data.type === 'restart') {
                    this.gameOverForm.hide();
                    this.restartGame();
                    answer(this.stopped);
                }

                if (data.type === 'portrait') {
                    if (!this.pauseFlag)
                        this.pauseGame();
                    answer(this.pauseFlag);
                }

                if (data.type === 'shoot') {

                    this.launchBullet(data.bulletType);                    

                }

                if (data.type === 'move') {
                    var x = 0;
                    var y = 0;
                    var betaStart = Math.floor(data.startBeta);
                    var gammaStart = Math.floor(data.startGamma);
                    var beta = Math.floor(data.beta);
                    var gamma = Math.floor(data.gamma);
                    var k = 0.5;

                    var moveX = this.getDirectionX(betaStart, beta);
                    if (moveX.differ > this.player.maxhspeed) {
                        moveX.differ = this.player.maxhspeed;
                    }
                    if (moveX.direct === "left") {
                        x -= moveX.differ * k;
                    }
                    if (moveX.direct === "right") {
                        x += moveX.differ * k;
                    }
                    var moveY = this.getDirectionY(gammaStart, gamma);
                    if (moveY.differ > this.player.maxvspeed) {
                        moveY.differ = this.player.maxvspeed;
                    }
                    if (moveY.direct === "up") {
                        y -= moveY.differ * k;
                    }
                    if (moveY.direct === "down") {
                        y += moveY.differ * k;
                    }

                    this.player.joystickMove(this.GAME_WIDTH, this.GAME_HEIGHT, x, y);
                }
            },

            getDirectionY: function(startPos, pos) {
                var diff = pos - startPos;
                var dir = "up";
                if (diff < 0)
                    dir = "down";
                diff = Math.abs(diff);
                return {
                    differ: diff,
                    direct: dir
                }
            },

            getDirectionX: function(startPos, pos) {
                var diff = pos - startPos;
                var dir = "right";
                if (diff < 0)
                    dir = "left";
                diff = Math.abs(diff);
                return {
                    differ: diff,
                    direct: dir
                }
            },

            diff: function(startPos, pos) {
                var result1 = Math.abs(startPos - pos);
                var result2 = Math.abs(startPos - pos);
                if (startPos > 270) {
                    result1 = 360 - startPos + pos;
                    result2 = Math.abs(startPos - pos);
                }
                if (startPos < 90) {
                    result1 = startPos + (360 - pos);
                    result2 = Math.abs(startPos - pos);
                }
                return Math.min(result1, result2);
            },

            inDiapazon: function(x, a, b) {
                return (90 - this.diff(x, a)) === this.diff(x, b);
            },

            movePlayer: function() {
                if (!this.pauseFlag && !this.stopped) {

                    if (this.keydown["a"]) {
                        this.player.resource = this.resources.player[this.player.type][1];
                        this.player.updateSpeed(this.player.acceleration, 0, 0, 0);
                    }

                    if (!this.keydown["a"]) {
                        this.player.updateSpeed(-this.player.deceleration, 0, 0, 0);
                    }

                    if (this.keydown["d"]) {
                        this.player.resource = this.resources.player[this.player.type][2];
                        this.player.updateSpeed(0, this.player.acceleration, 0, 0);
                    }

                    if (!this.keydown["d"]) {
                        this.player.updateSpeed(0, -this.player.deceleration, 0, 0);
                    }

                    if (this.keydown["p"]) {
                        if (this.bulletTimer > this.BULLET_TIMEOUT) {
                            this.player.launchBullet(this, 1);
                            this.bulletTimer = 0;
                        }
                    }

                    if (!this.keydown["a"] && !this.keydown["d"] || this.keydown["a"] && this.keydown["d"]) {
                        this.player.resource = this.resources.player[this.player.type][0];
                    }

                    if (!this.keydown["w"]) {
                        this.player.updateSpeed(0, 0, -this.player.deceleration, 0);
                    }

                    if (!this.keydown["s"]) {
                        this.player.updateSpeed(0, 0, 0, -this.player.deceleration);
                    }

                    if (this.keydown["w"]) {
                        this.player.updateSpeed(0, 0, this.player.acceleration, 0);
                    }
                    if (this.keydown["s"]) {
                        this.player.updateSpeed(0, 0, 0, this.player.acceleration);
                    }

                    if (this.keydown["q"]) {
                        if (this.bulletTimer > this.BULLET_TIMEOUT && this.player.bonusBullets[0] > 0) {
                            this.player.launchBullet(this, 2);
                            this.bulletTimer = 0;
                            this.player.bonusBullets[0] -= 1;
                            this.setBulletInfo();
                        }

                    }
                    if (this.keydown["e"]) {
                        if (this.bulletTimer > this.BULLET_TIMEOUT && this.player.bonusBullets[1] > 0) {
                            this.player.launchBullet(this, 3);
                            this.bulletTimer = 0;
                            this.player.bonusBullets[1] -= 1;
                            this.setBulletInfo();
                        }

                    }

                    if (this.keydown["1"]) {
                        this.player.changeTypeOfShip(this.resources.player, 0, this.GAME_WIDTH, this.GAME_HEIGHT);
                        this.setShipInfo();
                    }
                    if (this.keydown["2"]) {
                        this.player.changeTypeOfShip(this.resources.player, 1, this.GAME_WIDTH, this.GAME_HEIGHT);
                        this.setShipInfo();
                    }

                    if (this.context.debug) {
                        if (this.keydown['z']) {
                            this.gameover = true;
                            this.endGame();
                        }
                        if (this.keydown['x']) {
                            for (var i = this.player.bonusBullets.length - 1; i >= 0; i--) {
                                this.player.bonusBullets[i] += 1;
                            };
                            this.setBulletInfo();
                        }
                    }
                }
                this.player.move(this.GAME_WIDTH, this.GAME_HEIGHT);

                if (Math.abs(this.player.joystickX) > Math.abs(this.player.maxhspeed / 10)) {
                    if (this.player.joystickX > 0)
                        this.player.resource = this.resources.player[this.player.type][2];
                    if (this.player.joystickX < 0)
                        this.player.resource = this.resources.player[this.player.type][1];
                }

                this.player.joystickMove(this.GAME_WIDTH, this.GAME_HEIGHT, this.player.joystickX, this.player.joystickY);

            },

            launchBullet: function(type){
                if (this.bulletTimer > this.BULLET_TIMEOUT){
                    if (type === 1){
                        this.player.launchBullet(this, 1);
                        this.bulletTimer = 0;
                        return;
                    }
                    if (this.player.bonusBullets[type - 2] > 0) {
                        this.player.launchBullet(this, type);
                        
                        this.player.bonusBullets[type - 2] -= 1;
                        this.setBulletInfo();
                        this.bulletTimer = 0;
                    }
                }
                
            },

            reloading: function(flag) {
                if (flag) {
                    var game = this;
                    this.interval = setInterval(function() {
                        game.play();
                        game.movePlayer();
                    }, 1000 / this.DELAY);
                } else
                    clearInterval(this.interval);
            },

            restartGame: function() {
                if (this.pauseFlag)
                    this.reloading(true);
                this.gameover = false;

                this.endGame();
                this.pauseFlag = false;
                this.stopped = false;
                this.setBtnText();

                this.drawBulletImg();
                this.setBulletInfo();
                this.setShipInfo();
                this.setScore();
            },

            pauseGame: function() {
                if (!this.stopped) {
                    if (this.pauseFlag) {
                        this.pauseFlag = false;
                        this.reloading(true);
                    } else {
                        this.pauseFlag = true;
                        this.reloading(false);
                        this.play();
                    }
                }
                this.setBtnText();

            },

            play: function() {
                if (this.bulletTimer === this.BULLET_TIMEOUT) {
                    this.server.send({
                        type: "canShoot"
                    })
                }
                this.drawBulletImg();
                this.setShipInfo();
                if (!this.pauseFlag && !this.stopped && !this.gameover) {

                    this.asteroidTimer += 1;
                    this.bulletTimer += 1;
                    this.bonusTimer += 1;
                    this.gameMechanic.draw(this);
                    this.gameMechanic.update(this);
                    return;
                }
                this.context.font = "bold " + this.FONT_SIZE + "px sans-serif";
                if (this.stopped) {
                    this.context.fillText("Click play button", this.GAME_WIDTH / 2 - this.FONT_SIZE * 4, this.GAME_HEIGHT / 2);
                    return;
                }
                if (this.pauseFlag) {
                    this.context.fillText("Game paused", this.GAME_WIDTH / 2 - this.FONT_SIZE * 3, this.GAME_HEIGHT / 2);
                    return;
                }
            },

            endGame: function() {
                if (this.gameover) {
                    this.gameOverForm.show(this.player.score);
                }
                this.level = 1;
                this.asteroidTimer = 0;
                this.bulletTimer = 0;
                this.player.resetAll();
                this.bonusTimer = 0;
                this.player.setStartPosition(this.GAME_WIDTH, this.GAME_HEIGHT);
                this.player.changeTypeOfShip(this.resources.player, 0, this.GAME_WIDTH, this.GAME_HEIGHT);
                this.asteroids = [];
                this.player.bullets = [];
                this.bangs = [];
                this.bonuses = [];
                this.keydown = [];
                this.stoppedFunc();
            },

            stoppedFunc: function() {
                this.context.clearRect(0, 0, this.GAME_WIDTH, this.GAME_HEIGHT);
                this.setScore();
                this.stopped = true;
                this.setBtnText();
                this.setLevelInfo();
            },

            drawBulletImg: function() {
                var canvas = document.getElementById("first_bullet");
                canvas.width = this.resources.bullet.img.width
                canvas.height = this.resources.bullet.img.height
                context = canvas.getContext("2d");
                context.drawImage(this.resources.bullet.img, 0, 0)


                canvas = document.getElementById("second_bullet");
                canvas.width = this.resources.firstTypeBonus.img.width
                canvas.height = this.resources.firstTypeBonus.img.height
                context = canvas.getContext("2d");
                context.drawImage(this.resources.firstTypeBonus.img, 0, 0)


                canvas = document.getElementById("third_bullet");
                canvas.width = this.resources.secondTypeBonus.img.width
                canvas.height = this.resources.secondTypeBonus.img.height
                context = canvas.getContext("2d");
                context.drawImage(this.resources.secondTypeBonus.img, 0, 0)
            },

            setBulletInfo: function() {
                $('.first-bonus').html(this.player.bonusBullets[0]);
                $('.second-bonus').html(this.player.bonusBullets[1]);
            },

            setLevelInfo: function() {
                var load = (this.level - 1) / 0.015 + '%';
                var load_el = $('.info__level');
                if (parseInt(load) <= 100)
                    load_el.css('background-color', 'red');
                if (parseInt(load) < 70)
                    load_el.css('background-color', 'yellow');
                if (parseInt(load) < 40)
                    load_el.css('background-color', 'green');
                load_el.width(load);
            },

            setShipInfo: function() {
                $('#ship-size').html(this.player.resource.radius);
                $('#ship-hspeed').html(this.player.maxhspeed);
                $('#ship-vspeed').html(this.player.maxvspeed);
                $('#ship-multiplier').html(this.player.damageMultiplier);

                canvas = document.getElementById("ship_img");
                context = canvas.getContext("2d");
                switch (this.player.type) {
                    case 0:
                        canvas.width = this.resources.firstTypeShip.img.width
                        canvas.height = this.resources.firstTypeShip.img.height
                        context.drawImage(this.resources.firstTypeShip.img, 0, 0)
                        break;
                    case 1:
                        canvas.width = this.resources.secondTypeShip.img.width
                        canvas.height = this.resources.secondTypeShip.img.height
                        context.drawImage(this.resources.secondTypeShip.img, 0, 0)
                        break;
                }

            },

            setScore: function() {
                $('#score').html(this.player.score);
            }

        });

        return Game;
    });