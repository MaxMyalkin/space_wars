define(['Modernizr'],
    function(Modernizr) {

        var checkConsoleFeatures = function() {
            if (!Modernizr.fontface || !Modernizr.audio || !Modernizr.canvas || !Modernizr.localstorage || !Modernizr.sessionstorage || !Modernizr.websockets) {
                return false;
            }
            return true;
        };

        var checkJoystickFeatures = function() {
            if (!Modernizr.fontface || !Modernizr.sessionstorage || !Modernizr.websockets || !Modernizr.touch) {
                return false;
            }
            return true;
        };

        return {
            checkJoystickFeatures: checkJoystickFeatures,
            checkConsoleFeatures: checkConsoleFeatures
        }
    });