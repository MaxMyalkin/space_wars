define([
    'backbone',
    'tmpl/main'
], function(
    Backbone,
    tmpl,
    models
){

    var View = Backbone.View.extend({
        template: tmpl,
        el: "#main",
        initialize: function () {

        },
        render: function () {
             this.$el.html(this.template);            
        },
        show: function () {
            this.render();
            this.trigger("show");

        },
        hide: function () {

        }

    });

    return new View();
});