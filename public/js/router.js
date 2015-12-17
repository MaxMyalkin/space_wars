define(['backbone',
    'views/main',
    'views/scoreboard',
    'views/game',
    'views/viewManager'

], function(Backbone,
    mainScreen,
    scoreboardScreen,
    gameScreen,
    viewManager
) {
    var currentScreen = "";
    var Router = Backbone.Router.extend({
        routes: {
            'scoreboard': 'scoreboardAction',
            'game': 'gameAction',
            '*default': 'defaultActions'
        },
        initialize: function() {
            this.viewManager = viewManager;
            viewManager.addView(mainScreen._name, mainScreen);
            viewManager.addView(scoreboardScreen._name, scoreboardScreen);
            viewManager.addView(gameScreen._name, gameScreen);
        },
        defaultActions: function() {
            mainScreen.show();
        },
        scoreboardAction: function() {
            scoreboardScreen.show();
        },
        gameAction: function() {
            gameScreen.show();
        }
    });

    return new Router();
});