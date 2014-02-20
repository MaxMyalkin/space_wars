define([
    'backbone',
    'tmpl/scoreboard',
    'collections/scores',
    'models/score'
], function(
    Backbone,
    tmplScore,
    Scoreboard,
    Player
){
    var ScoreboardView = Backbone.View.extend({
        el: $("#page"),
        template: tmplScore,
        scoreboard: Scoreboard,
        initialize: function () {
            // TODO      
        },
        render: function () {
        },
        show: function () {
            this.$el.html(this.template({scoreboard: this.scoreboard.models}));
        },
        hide: function () {
            // TODO
        }
    });

    return new ScoreboardView();
});