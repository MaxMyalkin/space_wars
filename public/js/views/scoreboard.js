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
            alert("show scoreboard");
        },
        hide: function () {
            // TODO
            alert("hide scoreboard");
        }

    });

    return new View();
});