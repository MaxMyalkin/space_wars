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
    window.addEventListener("deviceorientation", updategyro, false);
    window.addEventListener('orientationchange', changeOrientation);
    mo.init();
    var server = new Connection({
        remote: '/player'
    });
    $('#errorForm').hide();
    $('.buttons').hide();
    $('#mainscreen').show();

    $('#shoot').on('click', function() {
        server.send({ // прикрутить тип патронов
            type: 'shoot'
        });
    });

    $('#pause').on('click', function() {
        server.send({
            type: 'pause'
        });
        setBtnText();
    });
    $('#restart').on('click', function() {
        server.send({
            type: 'restart'
        });
        setBtnText();
    });


    var stopped = true;
    var pause = false;

    var currentAlpha = 0;
    var currentGamma = 0;

    var startPosAlpha = 0;
    var startPosGamma = 0;

    var current_position;

    function updategyro(e) {
        current_position = deviceOrientation(e);
        if (Math.abs(currentAlpha - current_position.alpha) > 1 || Math.abs(currentGamma - current_position.gamma) > 1) {
            server.send({
                type: 'move',
                startAlpha: startPosAlpha,
                startGamma: startPosGamma,
                alpha: current_position.alpha,
                gamma: current_position.gamma
            });
            currentAlpha = current_position.alpha;
            currentGamma = current_position.gamma;
        }


        $("#alpha").html(current_position.alpha);
        $("#gamma").html(current_position.gamma);
    };


    server.onReady(function() {
        server.on('message', function(data) {
            console.log(data);
        });
    });

    $('#submit').click(function() {
        var currentPos = current_position;
        startPosAlpha = currentPos.alpha;
        startPosGamma = currentPos.gamma;
        currentAlpha = startPosAlpha;
        currentGamma = startPosGamma;
        server.bind({
            token: $('#token').val()
        }, function(answer) {
            if (answer.status == 'success') {
                $('#tokenForm').hide();
                $('.buttons').show();
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
    }

});