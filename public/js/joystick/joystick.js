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
    $('#mainscreen').hide();
    $('#shoot').on('click', function() {
        server.send({ // прикрутить тип патронов
            type: 'shoot'
        });
    });
    $('#start').on('click', function() {
        server.send({ // прикрутить тип патронов
            type: 'start'
        });
    });
    $('#restart').on('click', function() {
        server.send({ // прикрутить тип патронов
            type: 'restart'
        });
    });

    var currentAlpha = 0;
    var currentGamma = 0;

    var startPosAlpha = 0;

    var current_position;

    function updategyro(e) {
        current_position = deviceOrientation(e);
        server.send({
            type: 'control',
            startAlpha: startPosAlpha,
            alpha: current_position.alpha,
            beta: current_position.beta,
            gamma: current_position.gamma
        });
        currentAlpha = current_position.alpha;
        currentGamma = current_position.gamma;
    };


    server.onReady(function() {
        server.on('message', function(data) {
            console.log(data);
        });
    });

    $('#submit').click(function() {
        var currentPos = current_position;
        startPosAlpha = currentPos.alpha;
        server.bind({
            token: $('#token').val()
        }, function(answer) {
            if (answer.status == 'success') {
                $('#tokenForm').hide();
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
                type: 'portrait'
            });
        } else {
            // landscape если игра остановлена продолжить
            server.send({
                type: 'landscape'
            });
            $('#mainscreen').show();
            $('#errorForm').hide();

        }
    };
});