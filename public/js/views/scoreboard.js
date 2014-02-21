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
            var player =new Player({ name: "max", score: 888 });
            this.scoreboard.add(player);
            player = new Player({ name: "maxim", score: 988 });
            this.scoreboard.add(player);
            var player = new Player({ name: "sergey", score: 788 });
            this.scoreboard.add(player);
            var player = new Player({ name: "ivan", score: 178 });
            this.scoreboard.add(player);
            var player = new Player({ name: "anton", score: 1178 });
            this.scoreboard.add(player);
            var player = new Player({ name: "ilya", score: 1000 });
            this.scoreboard.add(player);
            var player = new Player({ name: "sergey2", score: 748 });
            this.scoreboard.add(player);
            var player = new Player({ name: "ivan2", score: 1780 });
            this.scoreboard.add(player);
            var player = new Player({ name: "anton2", score: 1078 });
            this.scoreboard.add(player);
            var player = new Player({ name: "ilya2", score: 1100 });
            this.scoreboard.add(player);
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