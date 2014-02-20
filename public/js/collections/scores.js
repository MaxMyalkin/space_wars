define([
    'backbone',
    'models/score'
], function(
    Backbone,
    Score
){
    var Scoreboard = Backbone.Collection.extend({
    	model: Score,

    	initialize: function() {
    		this.models = [
	    		{
	    			name: "MAX",
	    			score: 1000
	    		},
	    		{
	    			name: "SIRIOGA",
	    			score: -1000
	    		}
    		];
    	}
    });
    return new Scoreboard();
});