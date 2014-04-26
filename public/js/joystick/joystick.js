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
    var bulletType = 1;

    var gameStarted = false;
    var fingers = 0;
    var currentPressed = null;
    var canShoot = false;

    var shootFingerIdentifier = null;
    var switchBulletIdentifier = null;
    //var shootBtn = $('#shoot')[0];


    var shootBtn = document.getElementById('shoot');
    var pauseBtn = document.getElementById('pause');
    var restartBtn = document.getElementById('restart');

    var bulletSwitcher = document.getElementById('bulletSwitcher');
    var bullet1 = document.getElementById('bullet1');
    var bullet2 = document.getElementById('bullet2');
    var bullet3 = document.getElementById('bullet3');

    shootBtn.addEventListener("touchstart", function(event) {
        event.preventDefault();
    });


    pauseBtn.addEventListener("touchstart", function(event) {
        event.preventDefault();
        currentPressed = null;
        server.send({
            type: 'pause'
        }, function(data) {
            pause = data;
            setBtnText();
        });

    });

    restartBtn.addEventListener("touchstart", function(event) {
        event.preventDefault();
        currentPressed = null;
        var currentPos = current_position;
        startPosBeta = currentPos.beta;
        startPosGamma = currentPos.gamma;
        currentBeta = startPosBeta;
        currentGamma = startPosGamma;
        server.send({
            type: 'restart'
        }, function(data) {
            stopped = data;
            setBtnText();
        });
    });

    window.addEventListener("touchstart", touchStart);
    window.addEventListener("touchend", touchEnd);
    window.addEventListener("deviceorientation", updategyro, false);
    window.addEventListener('orientationchange', changeOrientation);
    mo.init();

    var stopped = true;
    var pause = false;
    var server = new Connection({
        remote: '/player'
    });
    $('#errorForm').hide();
    $('.buttons').hide();
    $('.switchers').hide();
    $('#mainscreen').show();


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

        $("#betta").html(current_position.beta);
        $("#gamma").html(current_position.gamma);
    };


    server.onReady(function() {
        server.on('message', function(data) {
            if (data.type === "canShoot") {
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
                $('.switchers').show();
                gameStarted = true;
            } else {
                $('.error').html(answer.status);
            }
        });


        return false;
    });

    function changeOrientation() {
        if (window.orientation % 180 == 0) {
            $('#errorForm').show();
            $('#mainscreen').hide();

            server.send({
                    type: 'portrait'
                },
                function(data) {
                    pause = data;
                    setBtnText();
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
        var restart = $('.button__text.start');
        if (pause) {
            pauseBtn.html("Go");
        } else {
            pauseBtn.html("Pause");
        }
        if (stopped) {
            restart.html("Start");
        } else {
            restart.html("Restart");
        }
    };


    function touchStart(event) {
        fingers = event.touches.length;
        var shoot = null;
        var bullet = null;
        for (var i = 0; i < fingers; i++) {
            if (bulletSwitcher.contains(event.touches[i].target))
                bullet = event.touches[i].identifier;
            if (shootBtn.contains(event.touches[i].target))
                shoot = event.touches[i].identifier;
        }
        if (shoot != null)
            currentPressed.push({

            })

        /*
        if (fingers === 1){
=======
    function touchStart(event) {
        if (gameStarted)
            event.preventDefault();
        fingers = event.touches.length;
        if (fingers === 1) {
>>>>>>> ea099ff4c4138d28759a7dd1bae391e6176dbfcc
            var target = event.touches[0].target;
            currentPressed = {
                target: target,
                pressed: true
            };
            currentPressed.target.addEventListener("touchend", touchEnd);
            if (bulletSwitcher.contains(currentPressed.target)){
                checkBullet(currentPressed.target, null);
            }
        }
<<<<<<< HEAD
        
            
        if (fingers === 2){
            var target1 = event.touches[0].target;
            var target2 = event.touches[1].target;
            if ( (bulletSwitcher.contains(target1) || bulletSwitcher.contains(target2))
                && (shootBtn.contains(target1) || shootBtn.contains(target2)) ){
                    checkBullet(target1, target2);
                }
        }*/

    };


    function checkBullet(target1, target2) {
        var target;
        if (bulletSwitcher.contains(target1))
            target = target1;
        if (bulletSwitcher.contains(target2))
            target = target2;
        switch (target) {
            case bullet1:
                bulletType = 1;
                break;
            case bullet2:
                bulletType = 2;
                break;
            case bullet3:
                bulletType = 3;
                break;
        }

    };

    function targetContains(event, element) {
        for (var i = 0; i < event.length; i++) {
            if (element.contains(event[i].target))
                return true;
        }
        return false;
    }

    var interval = setInterval(function() {
        $("#fingers").html(fingers);
        if (currentPressed != null) {
            if (canShoot && shootBtn.contains(currentPressed.target) && currentPressed.pressed === true) {
                canShoot = false;
                server.send({
                    type: "shoot",
                    bulletType: bulletType
                });
            }
        }

    }, 50);

    function touchEnd(event) {
        /*if (gameStarted)
=======
    function touchEnd(event) {
        if (gameStarted)
>>>>>>> ea099ff4c4138d28759a7dd1bae391e6176dbfcc
            event.preventDefault();
        */
        fingers = event.touches.length;
        currentPressed.pressed = false;
    };

});