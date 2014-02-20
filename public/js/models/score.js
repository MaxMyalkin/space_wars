define([
    'backbone',
], function(
    Backbone
){


   var PlayerModel = Backbone.Model.extend({
        default:
        {
            name: '',
            score: 0
        }
    });

	var player = new PlayerModel();

	player.on('change:name', function(model, name) {
	    alert('Player name is ' + name);
	});

    return player;
});