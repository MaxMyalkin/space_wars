define([
    'backbone',
    'models/score'
], function(

    Backbone,
    Score
){
    var Scoreboard = Backbone.Collection.extend({
    	model: Score,

        comparator: function(score){
            return -score.get("score"); // компаратор по убыванию
        },

    	initialize: function() {
    		/*var players = [
                {name: "max", score: 888},
                {name: "maxim", score: 988},
                {name: "sergey", score: 788},
                {name: "ivan", score: 178},
                {name: "anton", score: 1178},
                {name: "ilya", score: 1000},
                {name: "sergey2", score: 748},
                {name: "ivan2", score: 1780},
                {name: "anton2", score: 100},
                {name: "ilya2", score: 1100}
            ];
            for (var i = 0; i < players.length; i++) {
                var player = new Score(players[i]);
                this.add(player);
            }*/
    	}
    });

    var s = new Scoreboard();
    return s;
});

