require(['js/main.js', 'js/lib/Connector.js', 'js/lib/deviceapi-normaliser'], function(main, Connection) {
    window.addEventListener("deviceorientation", updategyro, false);
    mo.init();
    $("#param").html("browser: "+mo._browser+" os: "+mo._os+" normalise: "+mo.normalise+" orientation: "+mo.orientation);

    var server = new Connection({
        remote: '/player'
    });

    var currentAlpha = 0;
    var currentGamma = 0;

    var startPosAlpha = 0;

    var current_position;

    function updategyro(e) {
        current_position = deviceOrientation(e);
        
        if ((current_position.alpha != null) && 
            (Math.abs(currentGamma - current_position.gamma) < 3 || Math.abs(currentAlpha - current_position.alpha) < 3)){
            server.send({
                type: 'control',
                startAlpha: startPosAlpha, 
                alpha: current_position.alpha,
                beta: current_position.beta,
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

    $("#btn").click(function() {
        server.send($('#token').val(), function(answer) {
            console.log(answer);
        });
    });

    $('#submit').click(function() {
        var currentPos = current_position;
        startPosAlpha = currentPos.alpha;
        server.bind({
            token: $('#token').val()
        }, function(answer) {
            console.log(answer);

        });

    })
});