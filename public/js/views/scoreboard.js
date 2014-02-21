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
        el: "#page",
        template: tmplScore,
        scoreboard: Scoreboard,
        initialize: function () {
            var players =new Player({ name: "max", score: 888 });
            this.scoreboard.add(players);
            var pl2 = new Player({ name: "max2", score: 988 });
            this.scoreboard.add(pl2);
            var pl3 = new Player({ name: "max3", score: 788 });
            this.scoreboard.add(pl3);
        },
        render: function () {
        },
        show: function () {
            console.log(this.scoreboard);
            this.$el.html(this.template({scoreboard: this.scoreboard.models}));
        },
        hide: function () {
            // TODO
        }
    });
    return new ScoreboardView();

});