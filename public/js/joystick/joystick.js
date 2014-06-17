require.config({
    urlArgs: "_=" + (new Date()).getTime(),
    baseUrl: "js",
    paths: {
        jquery: "lib/jquery",
        underscore: "lib/underscore",
        backbone: "lib/backbone",
        Connector: "lib/Connector",
        FnQuery: "lib/FnQuery",
        Modernizr: "lib/Modernizr",
        device_orientation: "lib/deviceapi-normaliser",
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

require(['lib/Connector', 'checking', 'lib/hammer', 'lib/deviceapi-normaliser', 'joystick/serverFunc'],
    function(Connection, Modernizr, HammerJS) {
        var hammerOptions = {
            preventDefault: true
        };
        var delay = 0;
        setInterval(function() {
            delay += 50;
        }, 50)
        var currentBulletType = 1;
        var currentShipType = 1;
        var gameStarted = false;
        var stopped = true;
        var pause = false;
        var currentBeta = 0;
        var currentGamma = 0;
        var startPosBeta = 0;
        var startPosGamma = 0;
        var current_position;
        var disconnected = false;

        var shootBtn = document.getElementById('shoot');
        var pauseBtn = document.getElementById('pause');
        var restartBtn = document.getElementById('restart');
        var bulletSwitcher = document.getElementById('bulletSwitcher');
        var shipSwitcher = document.getElementById('shipSwitcher');
        var pauseBtnImg = $('.button__text.pause');
        var restartImg = $('.button__text.start');

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
                if (!disconnected && (Math.abs(currentBeta - current_position.beta) > 2 || Math.abs(currentGamma - current_position.gamma) > 2) && delay > 150) {
                    delay = 0;
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
                changeOrientation();
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
                (new HammerJS(window, hammerOptions));
                $('#token').val("");
                return false;
            });

            function messageRecieved(data, answer) {

                switch (data.type) {
                    case 'reset':
                        currentBulletType = 1;
                        pauseBtnImg.attr('src', 'images/buttons/pause.png');
                        //переключить -----------------------------------------------------------------------------------------
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

            (new HammerJS(restartBtn, hammerOptions)).on('tap', function(ev) {
                var currentPos = current_position;
                startPosBeta = currentPos.beta;
                startPosGamma = currentPos.gamma;
                currentBeta = startPosBeta;
                currentGamma = startPosGamma;
                server.send({
                    type: 'restart'
                });
            });

            (new HammerJS(pauseBtn, hammerOptions)).on('tap', function(ev) {
                server.send({
                    type: 'pause'
                });
            });

            (new HammerJS(shipSwitcher, hammerOptions)).on('gesture', function(ev) {
                if (ev.gesture.eventType === 'end') {
                    if (currentShipType === 1)
                        currentShipType = 2;
                    else
                        currentShipType = 1;

                    switch (currentShipType) {
                        case 1:
                            $('#shipSwitcher .button__img').attr('src', '/images/ship/first/info.png');
                            break;
                        case 2:
                            $('#shipSwitcher .button__img').attr('src', '/images/ship/second/info.png');
                            break;
                    }

                    server.send({
                        type: 'ship',
                        shipType: currentShipType
                    });
                }
            });

            (new HammerJS(bulletSwitcher, hammerOptions)).on('gesture', function(ev) {
                if (ev.gesture.eventType === 'end') {
                    if (ev.gesture.type === 'tap' || ev.gesture.direction === 'left') {
                        if (currentBulletType > 0 && currentBulletType < 3)
                            currentBulletType++;
                        else
                            currentBulletType = 1;
                    } else {
                        if (currentBulletType > 1 && currentBulletType < 4)
                            currentBulletType--;
                        else
                            currentBulletType = 3;
                    }
                    switch (currentBulletType) {
                        case 1:
                            $('#bulletSwitcher .button__img').attr('src', '/images/bullet/bullet.png');
                            break;

                        case 2:
                            $('#bulletSwitcher .button__img').attr('src', '/images/bullet/firstbonus.png');
                            break;

                        case 3:
                            $('#bulletSwitcher .button__img').attr('src', '/images/bullet/secondbonus.png');
                            break;
                    }
                }
            });

            (new HammerJS(shootBtn, hammerOptions)).on('gesture', function(ev) {
                if (ev.gesture.eventType === 'touch') {
                    server.send({
                        type: 'shootStart',
                        bulletType: currentBulletType
                    });
                }

                if (ev.gesture.eventType === 'end') {
                    server.send({
                        type: 'shootEnd'
                    });
                }
            });


        } else {
            error.html("some features aren't supported");
            errorForm.show();
        }

    });