define([
    'backbone',
    'tmpl/game',
     'game/game'
], function(
    Backbone,
    tmpl,
    Game
){
 
    var View = Backbone.View.extend({
        el: "#game",
        template: tmpl,
        initialize: function () {
             
        },
        render: function () {
            this.$el.html(this.template);
            this.game = Game();        
        },
        show: function () {
            this.render();
            //this.trigger("show1");
        },
        hide: function () {
        	this.game = null;
        }
 
    });

    var game = new View();
 	game.on();
    return game;
});