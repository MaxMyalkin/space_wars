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
    return PlayerModel;
});