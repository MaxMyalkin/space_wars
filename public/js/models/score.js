define([
    'backbone'
], function(
    Backbone
){

   var PlayerModel = Backbone.Model.extend({
    });

	var player = new PlayerModel();

	player.on('change:name', function(model, name) {
	    alert('Player name is ' + name);
	});

	player.set({name: 'Mark'});
    return Model;
});