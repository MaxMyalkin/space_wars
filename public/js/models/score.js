define([
    'backbone',
], function(
    Backbone
){
   var PlayerModel = Backbone.Model.extend({
        defaults:
        {
            name: '',
            score: 0
        }
    });
    return PlayerModel;
});