define([
    'backbone',
    'models/score'
], function(
    Backbone, 
    Player
){

    var PlayerCollection = Backbone.Collection.extend({
    	model: Player
    });

    return new PlayerCollection();
});