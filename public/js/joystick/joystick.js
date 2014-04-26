require.config({
    urlArgs: "_=" + (new Date()).getTime(),
    baseUrl: "js",
    paths: {
        jquery: "/js/lib/jquery",
        underscore: "/js/lib/underscore",
        backbone: "/js/lib/backbone",
        Connector: "/js/lib/Connector",
        FnQuery: "/js/lib/FnQuery",
        device_orientation: "js/lib/deviceapi-normaliser",
        "socket.io": "/socket.io/socket.io"
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        "socket.io": {
            exports: "io"
        },
        "device_orientation": {
            exports: "deviceOrientation"
        }
    }
});

require(['js/lib/Connector.js', 'lib/deviceapi-normaliser'], function(Connection) {

    var gameStarted = false;
    var fingers = 0;
    var currentPressed = null;
    var canShoot = false;
    //var shootBtn = $('#shoot')[0];

    var shootBtn = document.getElementById('shoot');
    var pauseBtn = document.getElementById('pause');
    var restartBtn = document.getElementById('restart');

    var bullet1 = document.getElementById('off1');
    var bullet2 = document.getElementById('neutral1');
    var bullet3 = document.getElementById('on1'); 

    pauseBtn.addEventListener("touchstart", function(event){
        event.preventDefault();
        currentPressed = null;
        server.send({
            type: 'pause'
        });
        setBtnText();
    });

    restartBtn.addEventListener("touchstart", function(event){
        event.preventDefault();
        currentPressed = null;
        var currentPos = current_position;
        startPosBeta = currentPos.beta;
        startPosGamma = currentPos.gamma;
        currentBeta = startPosBeta;
        currentGamma = startPosGamma;
        server.send({
            type: 'restart'
        });
        setBtnText();
    });

    window.addEventListener("touchstart", touchStart);
    window.addEventListener("touchend", touchEnd);

    window.addEventListener("deviceorientation", updategyro, false);
    window.addEventListener('orientationchange', changeOrientation);
    mo.init();
    var server = new Connection({
        remote: '/player'
    });
    $('#errorForm').hide();
    $('.buttons').hide();
    $('#mainscreen').show();

/*
    $('#shoot').on('click', function() {
        server.send({ // прикрутить тип патронов
            type: 'shoot'
        });
    });
*/
    var stopped = true;
    var pause = false;

    var currentBeta = 0;
    var currentGamma = 0;

    var startPosBeta = 0;
    var startPosGamma = 0;

    var current_position;

    function updategyro(e) {
        current_position = deviceOrientation(e);
        if (Math.abs(currentBeta - current_position.beta) > 2 || Math.abs(currentGamma - current_position.gamma) > 2) {
            server.send({
                type: 'move',
                startBeta: startPosBeta,
                startGamma: startPosGamma,
                beta: current_position.beta,
                gamma: current_position.gamma
            });
            currentBeta = current_position.beta;
            currentGamma = current_position.gamma;
        }


        //$("#alpha").html(current_position.alpha);
        $("#betta").html(current_position.beta);
        $("#gamma").html(current_position.gamma);
    };


    server.onReady(function() {
        server.on('message', function(data) {
            if (data.type === "canShoot"){
                canShoot = true;
            }
        });
    });

    $('#submit').click(function() {
        var currentPos = current_position;
        startPosBeta = currentPos.beta;
        startPosGamma = currentPos.gamma;
        currentBeta = startPosBeta;
        currentGamma = startPosGamma;
        server.bind({
            token: $('#token').val()
        }, function(answer) {
            if (answer.status == 'success') {
                $('#tokenForm').hide();
                $('.buttons').show();
                gameStarted = true;
            } else {
                $('.error').html(answer.status);
            }
        });


        return false;
    });

    function changeOrientation() {
        if (window.orientation % 180 == 0) {
            // portrait, вывести сообщение об ошибке и остановить игру. 
            $('#errorForm').show();
            $('#mainscreen').hide();
            server.send({
                type: 'pause'
            });
            setBtnText();
        } else {
            // landscape если игра остановлена продолжить
            server.send({
                type: 'landscape'
            });
            $('#mainscreen').show();
            $('#errorForm').hide();

        }
    };

    function setBtnText() {
        var pauseBtn = $('.button__text.pause');
        var restart = $('.button__text.restart');
        if (pause) {
            pauseBtn.html("go");
        } else {
            pauseBtn.html("Pause");
        }
        if (stopped) {
            restart.html("");
        } else {
            restart.html("Restart");
        }
    };

    function touchStart(event){
        if (gameStarted)
            event.preventDefault();
        fingers = event.touches.length;
        if (fingers === 1){
            var target = event.touches[0].target;
            currentPressed = {
                target: target,
                pressed: true
            };
            currentPressed.target.addEventListener("touchend", touchEnd);
        }
        if (fingers === 2){

        }
        
    };

    var interval = setInterval(function() {
        $("#fingers").html(fingers);
        if (currentPressed != null){
            if (canShoot && shootBtn.contains(currentPressed.target) && currentPressed.pressed === true){
                canShoot = false;
                server.send({
                    type: "shoot"
                });
            }
        }
        
    }, 50);

    function touchEnd(event){
        if (gameStarted)
            event.preventDefault();
        fingers = event.touches.length;
        currentPressed.pressed = false;
        //var target = event.targetTouches[0].target;

    };

});