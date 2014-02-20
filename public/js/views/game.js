define([
    'backbone',
    'tmpl/game'
], function(
    Backbone,
    tmpl
){

    var View = Backbone.View.extend({
        el: $("#page"),
        template: tmpl,
        initialize: function () {
            
        },
        render: function () {
            // TODO
        },
        show: function () {
            this.$el.html(this.template);
            alert("show game");
        },
        hide: function () {
            // TODO
            alert("hide game");
        }

    });

    return new View();
});