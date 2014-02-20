define([
    'backbone'
], function(
    Backbone
){

    var PlayerModel = Backbone.Model.extend({
    	defaults:{
    		name: 'dsa',
    		score: 0
    	}
    });
  	
    return PlayerModel;
});