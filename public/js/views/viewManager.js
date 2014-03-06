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
    		this.listenTo(Main , 'show' , this.handle(event));
    		this.listenTo(Game , 'show1' , this.handle1(event));
    		this.listenTo(Scoreboard , 'show2' , this.handle2(event));
    	},

        handle: function(event) {
        	console.log(event);
        },

        handle1: function(event){
        	console.log(event);
        },
        handle2: function(event){
        	console.log(event);
        }

    });

    return new View();
});