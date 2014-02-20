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
        el: $("#page"),
        initialize: function () {

        },
        render: function () {
            
        },
        show: function () {
             this.$el.html(this.template);
        },
        hide: function () {

        }

    });

    return new View();
});