define([
    'backbone',
    'tmpl/player',
    'models/score'
], function(
    Backbone,
    tmpl,
    
){

    var PlayerView = Backbone.View.extend({

    tagName: "li", //тэг для игрока
    className: "score__item", // класс для игрока
    template: tmpl, //шаблон

    events: {
        "click .button_delete": "destroy" //вызываем удаление при нажатии на кнопку
    },

    initialize: function () {
        this.listenTo(this.model, "change", this.render);
    },

    render: function () {
        this.$el.html(this.template(this.model.attributes));
        return this;
    },

    destroy: function () {

    }
});

var playerView = new PlayerView({
        model: player,
        id: "player-" + player.id
    });

});