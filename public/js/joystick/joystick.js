require(['js/main.js', 'js/lib/Connector.js', 'js/lib/deviceapi-normaliser'], function(main, Connection) {
    window.addEventListener("deviceorientation", updategyro, false);
    mo.init();
    var server = new Connection({
        remote: '/player'
    });

    var currentAlpha = 0;
    var currentGamma = 0;

    function updategyro(e) {
        var current_position = deviceOrientation(e);
        if (Math.abs(currentGamma - current_position.gamma) < 3 || Math.abs(currentAlpha - current_position.alpha) < 3){
            server.send({
                type: 'control',
                alpha: current_position.alpha,
                beta: current_position.beta,
                gamma: current_position.gamma
            });
            currentAlpha = current_position.alpha;
            currentGamma = current_position.gamma;
        }
            
        //console.log(current_position.alpha + ' ' + current_position.gamma);
    };

    server.onReady(function() {
        server.on('message', function(data) {
            console.log(data);
        });
    });

    $("#btn").click(function() {
        server.send($('#token').val(), function(answer) {
            console.log(answer);
        });
    });

    $('#submit').click(function() {
        server.bind({
            token: $('#token').val()
        }, function(answer) {
            console.log(answer);

        });

    })
});