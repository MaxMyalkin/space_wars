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
        el: $("#page"),
        template: tmpl,
        initialize: function () {
             
        },
        render: function () {
            // TODO
        },
        show: function () {
            this.$el.html(this.template);
            var game = Game();
            //game.draw();
        },
        hide: function () {
            // TODO
        }
 
    });
 
    return new View();
});