define(['backbone',
 'views/main', 
 'views/scoreboard', 
 'views/game'
], function(Backbone, 
    mainScreen, 
    scoreboardScreen, 
    gameScreen
){
    var currentScreen = "";
    var Router = Backbone.Router.extend({
        routes: {
            'scoreboard': 'scoreboardAction',
            'game': 'gameAction',
            '*default': 'defaultActions'
        },
        defaultActions: function () {
            if(currentScreen === "scoreboard") {
                scoreboardScreen.hide();
            }
            else if (currentScreen === "game") {
                gameScreen.hide();
            };
            currentScreen = "main";
            mainScreen.show();
        },
        scoreboardAction: function () {
            mainScreen.hide();
            scoreboardScreen.render();
            currentScreen = "scoreboard";
        },
        gameAction: function () {
            mainScreen.hide();
            gameScreen.show();
            currentScreen = "game";
        }
    });

    return new Router();
});