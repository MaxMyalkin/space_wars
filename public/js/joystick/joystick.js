require.config({
    urlArgs: "_=" + (new Date()).getTime(),
    baseUrl: "js",
    paths: {
        jquery: "lib/jquery",
        underscore: "lib/underscore",
        backbone: "lib/backbone",
        Connector: "lib/Connector",
        FnQuery: "lib/FnQuery",
        device_orientation: "lib/deviceapi-normaliser",
        Modernizr: "lib/Modernizr",
        "socket.io": "lib/socket.io"
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
        },

        "Modernizr": {
            exports: 'Modernizr'
        }
    }
});

require(['lib/Connector', 'checking', 'lib/deviceapi-normaliser', 'joystick/serverFunc'],
    function(Connection, Modernizr) {
        var bulletType = 1;
        var gameStarted = false;
        var fingers = 0;
        var currentPressed = [];
        var canShoot = true;
        var stopped = true;
        var pause = false;
        var currentBeta = 0;
        var currentGamma = 0;
        var startPosBeta = 0;
        var startPosGamma = 0;
        var current_position;
        var disconnected = false;
        var disconnectBtn = document.getElementById('disconnect');
        disconnectBtn.addEventListener("touchstart",
            function() {
                event.preventDefault();
                currentPressed = [];
                server.send({
                    type: 'disconnect'
                });
                sessionStorage.removeItem('joystick_guid');
                console.log('disconnect');
                mainscreen.show();
                controls.hide();
                tokenForm.show();
                disconnected = true;
            }
        );
        var shootBtn = document.getElementById('shoot');
        var pauseBtn = document.getElementById('pause');
        var restartBtn = document.getElementById('restart');
        var bulletSwitcher = document.getElementById('bulletSwitcher');
        var bullet1 = document.getElementById('bullet1');
        var bullet2 = document.getElementById('bullet2');
        var bullet3 = document.getElementById('bullet3');
        var shipSwitcher = document.getElementById('shipSwitcher');
        var ship1 = document.getElementById('ship1');
        var ship2 = document.getElementById('ship2');
        var pauseBtnImg = $('.button__text.pause');
        var restartImg = $('.button__text.start');
        window.addEventListener("touchstart", touchStart);
        window.addEventListener("touchend", touchEnd);
        window.addEventListener("deviceorientation", updategyro, false);
        window.addEventListener('orientationchange', changeOrientation);
        var server;
        mo.init();

        errorForm.hide();
        controls.hide();
        mainscreen.hide();
        if (Modernizr.checkJoystickFeatures()) {
            server = new Connection({
                remote: '/player'
            });

            server.on('disconnect', disconnect);
            server.on('connect', connect);
            server.on('reconnect', reconnect.bind(server));
            server.on('message', messageRecieved)
            init.call(server);

            function updategyro(e) {
                current_position = deviceOrientation(e);
                if (!disconnected && (Math.abs(currentBeta - current_position.beta) > 2 || Math.abs(currentGamma - current_position.gamma) > 2)) {
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
            };

            $('#submit').click(function() {
                tokenError.html("");
                disconnected = false;
                var currentPos = current_position;
                startPosBeta = currentPos.beta;
                startPosGamma = currentPos.gamma;
                currentBeta = startPosBeta;
                currentGamma = startPosGamma;
                server.bind({
                    token: $('#token').val().toLowerCase()
                }, function(answer) {
                    if (answer.status == 'success') {
                        tokenForm.hide();
                        controls.show();
                        sessionStorage.setItem('guid_joystick', answer.guid);
                        gameStarted = true;

                    } else {
                        tokenError.html(answer.status);
                    }
                });
                $('#token').val("");
                return false;
            });

            function messageRecieved(data, answer) {

                switch (data.type) {
                    case 'canShoot':
                        canShoot = true;
                        break;

                    case 'shootACK':
                        canShoot = false;
                        break;

                    case 'reset':
                        bulletType = 1;
                        pauseBtnImg.attr('src', 'images/buttons/pause.png');
                        $('#shipSwitcher .active').removeClass('active');
                        $('#ship1').addClass('active');
                        $('#bulletSwitcher .active').removeClass('active');
                        $('#bullet1').addClass('active');
                        break;

                    case 'pause':
                        if (data.value) { // игра на паузе
                            pauseBtnImg.attr('src', 'images/buttons/play.png');
                        } else {
                            pauseBtnImg.attr('src', 'images/buttons/pause.png');
                        }
                        break;

                    case 'stop':
                        if (data.value) { // игра остановлена
                            restartImg.attr('src', 'images/buttons/play.png');
                        } else {
                            restartImg.attr('src', 'images/buttons/restart.png');
                        }
                        break;

                }
            }

            function changeOrientation() {
                if (window.orientation % 180 == 0) {
                    if (!errorForm.is(':visible')) {
                        errorForm.show();
                        error.html('please turn your device');
                        mainscreen.hide();
                        if (!disconnected) {
                            server.send({
                                    type: 'portrait'
                                },
                                function(data) {
                                    pause = data;
                                    setBtnText();
                                });
                        }

                        setBtnText();
                    }
                } else {
                    if (error.html() === 'please turn your device') {
                        server.send({
                            type: 'landscape'
                        });
                        mainscreen.show();
                        errorForm.hide();
                    }

                }
            };


            function touchStart(event) {
                fingers = event.touches.length;
                var shoot = null;
                var bullet = null;
                for (var i = 0; i < fingers; i++) {
                    if (bulletSwitcher.contains(event.touches[i].target))
                        bullet = event.touches[i];
                    if (shootBtn.contains(event.touches[i].target))
                        shoot = event.touches[i];
                };
                if (shoot != null)
                    currentPressed.push({
                        type: "shoot",
                        target: shoot.target,
                        identifier: shoot.identifier
                    });
                if (bullet != null) {
                    currentPressed.push({
                        type: "bullet",
                        target: bullet.target,
                        identifier: bullet.identifier
                    });
                    checkBullet(bullet.target);
                }

            };


            function checkBullet(target) {
                $("#bulletSwitcher .active").removeClass("active");
                switch (target) {
                    case bullet1:
                        bulletType = 1;
                        $('#bullet1').addClass("active");
                        break;
                    case bullet2:
                        bulletType = 2;
                        $('#bullet2').addClass("active");
                        break;
                    case bullet3:
                        bulletType = 3;
                        $('#bullet3').addClass("active");
                        break;
                }
            };

            var interval = setInterval(function() {
                if (canShoot && isElementInCurrentPressed(shootBtn)) {
                    server.send({
                        type: "shoot",
                        bulletType: bulletType
                    }, function(answer) {
                        if (answer === "shootACK") {
                            canShoot = false;
                        }
                    });
                }
            }, 50);

            function touchEnd(event) {
                var touches = event.changedTouches;
                var toDelete = [];
                for (var i = 0; i < touches.length; i++)
                    for (var j = 0; j < currentPressed.length; j++) {
                        if (touches[i].identifier === currentPressed[j].identifier)
                            toDelete.push(j);
                    }
                deleteEndedTouches(toDelete);
            };

            function deleteEndedTouches(indexes) {
                sortArray(indexes);
                for (var i = 0; i < indexes.length; i++) {
                    currentPressed.splice(indexes[i], 1);
                };
            };

            function sortArray(array) {
                array.sort(function(a, b) {
                    return b - a;
                })
            };

            function isElementInCurrentPressed(element) {
                for (var i = 0; i < currentPressed.length; i++) {
                    if (element.contains(currentPressed[i].target))
                        return true;
                }
                return false;
            };

            function getIdentifierFromCurrentPressed(type) {
                for (var i = 0; i < currentPressed.length; i++) {
                    if (currentPressed[i].type === type) {
                        return currentPressed[i].identifier;
                    }
                }
            };

            ship1.addEventListener("touchstart", function(event) {
                event.preventDefault();
                currentPressed = [];
                $('#shipSwitcher .active').removeClass('active');
                $('#ship1').addClass('active');
                server.send({
                    type: 'ship1'
                });
            });

            ship2.addEventListener("touchstart", function(event) {
                event.preventDefault();
                currentPressed = [];
                $('#shipSwitcher .active').removeClass('active');
                $('#ship2').addClass('active');
                server.send({
                    type: 'ship2'
                });
            });

            shootBtn.addEventListener("touchstart", function(event) {
                event.preventDefault();
            });

            bulletSwitcher.addEventListener("touchstart", function(event) {
                event.preventDefault();
            })

            pauseBtn.addEventListener("touchstart", function(event) {
                event.preventDefault();
                currentPressed = [];
                server.send({
                    type: 'pause'
                });

            });

            restartBtn.addEventListener("touchstart", function(event) {
                event.preventDefault();
                currentPressed = [];

                var currentPos = current_position;
                startPosBeta = currentPos.beta;
                startPosGamma = currentPos.gamma;
                currentBeta = startPosBeta;
                currentGamma = startPosGamma;
                server.send({
                    type: 'restart'
                });
            });
        } else {
            error.html("some features aren't supported");
            errorForm.show();
        }

    });