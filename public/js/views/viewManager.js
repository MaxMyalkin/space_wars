define([
    'backbone',
    'views/game',
    'views/main',
    'views/scoreboard'
], function(
    Backbone,
    Game,
    Main,
    Scoreboard
){

    var View = Backbone.View.extend({
    	initialize: function() {
    		this.listenTo(Main , 'show' , this.handle);
    		this.listenTo(Game , 'show' , this.handle);
    		this.listenTo(Scoreboard , 'show' , this.handle);
    	},

        handle: function(args) {
        	switch(args[0]){
                case "game":
                    Main.hide();
                    Scoreboard.hide();
                break;
                case "main":
                    Scoreboard.hide();
                    Game.hide();
                break;
                case "scoreboard":
                    Main.hide();
                    Game.hide();
                break;
            }
        }

    });

    return new View();
});