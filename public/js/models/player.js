define([
    'backbone'
], function(
    Backbone
){

    var PlayerModel = Backbone.Model.extend({
    	name: '',
    	score: 0;
    });
  	
    return PlayerModel;
});