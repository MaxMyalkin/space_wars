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
            this.$el.show();
            this.trigger("show", args=["game"]);
        },
        hide: function () {
        	this.game = null;
            this.$el.hide();
        }
 
    });

    var game = new View();
 	game.on();
    return game;
});