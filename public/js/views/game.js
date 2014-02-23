define([
    'backbone',
    'tmpl/game',
     'game_mechanics'
], function(
    Backbone,
    tmpl,
    game
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
            game();
        },
        hide: function () {
            // TODO
        }
 
    });
 
    return new View();
});