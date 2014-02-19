define(['backbone', 'views/main', 'views/scoreboard', 'views/game'
], function(Backbone, mainScreen, scoreboardScreen, gameScreen
){

    var Router = Backbone.Router.extend({
        routes: {
            'scoreboard': 'scoreboardAction',
            'game': 'gameAction',
            '*default': 'defaultActions'
        },
        defaultActions: function () {
            mainScreen.show();
        },
        scoreboardAction: function () {
            scoreboardScreen.show();
        },
        gameAction: function () {
            gameScreen.show();
        }
    });

    return new Router();
});