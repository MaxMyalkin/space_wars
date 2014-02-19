define([
    'backbone',
    'tmpl/scoreboard'
], function(
    Backbone,
    tmpl
){

    var View = Backbone.View.extend({
        el: $("#page"),
        template: tmpl,
        initialize: function () {
            // TODO
        },
        render: function () {
            // TODO
        },
        show: function () {
            this.$el.html(this.template);
        },
        hide: function () {
            // TODO
        }

    });

    return new View();
});