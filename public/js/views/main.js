define([
    'backbone',
    'tmpl/main',
    'models/player'
], function(
    Backbone,
    tmpl,
    models
){

    var View = Backbone.View.extend({
        template: tmpl,
        el: $("#page"),
        initialize: function () {

        },
        render: function () {

        },
        show: function () {
            this.$el.html(this.template);  
            var player = new PlayerModel();

            player.on('change:name', function(model, name) {
                alert('Player name is ' + name);
            });

            player.set({name: 'Mark'});
        },
        hide: function (){

        }

    });

    return new View();
});