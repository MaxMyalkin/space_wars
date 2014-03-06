define([
    'backbone',
    'tmpl/scoreboard',
    'collections/scores',
    'models/score',
], function(
    Backbone,
    tmplScore,
    Scoreboard,
    Player
){
    var ScoreboardView = Backbone.View.extend({
        el: "#scoreboard",
        template: tmplScore,
        scoreboard: Scoreboard,
        initialize: function () {
            var players = [
                {name: "max", score: 888},
                {name: "maxim", score: 988},
                {name: "sergey", score: 788},
                {name: "ivan", score: 178},
                {name: "anton", score: 1178},
                {name: "ilya", score: 1000},
                {name: "sergey2", score: 748},
                {name: "ivan2", score: 1780},
                {name: "anton2", score: 1078},
                {name: "ilya2", score: 1100}
            ];
            for (var i = 0; i < players.length; i++) {
                var player =new Player(players[i]);
                this.scoreboard.add(player);
            }
        },
        render: function () {
            this.$el.html(this.template({scoreboard: this.scoreboard.models}));
        },
        show: function () {
            this.render();
            this.$el.show();
            this.trigger("show", args=["scoreboard"]);
        },
        hide: function () {
            this.$el.hide();
        }
    });
    return new ScoreboardView();

});