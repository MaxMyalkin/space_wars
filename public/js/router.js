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
){
    var currentScreen = "";
    var Router = Backbone.Router.extend({
        routes: {
            'scoreboard': 'scoreboardAction',
            'game': 'gameAction',
            '*default': 'defaultActions'
        },
        initialize: function() {
        	this.viewManager = viewManager; 
        },
        defaultActions: function () {
            viewManager.addView(mainScreen._name, mainScreen);
	        mainScreen.show();
        },
        scoreboardAction: function () {
            viewManager.addView(scoreboardScreen._name, scoreboardScreen);
            scoreboardScreen.show();
        },
        gameAction: function () {
            viewManager.addView(gameScreen._name, gameScreen);
            gameScreen.show();
        }
    });

    return new Router();
});