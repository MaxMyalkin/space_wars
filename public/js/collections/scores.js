define([
    'backbone',
    'models/score'
], function(

    Backbone,
    Score
) {
    var Scoreboard = Backbone.Collection.extend({
        model: Score,

        comparator: function(score) {
            return -score.get("score"); // компаратор по убыванию
        },

        initialize: function() {}
    });

    var s = new Scoreboard();
    return s;
});