define([
    'backbone',
    'tmpl/main'
], function(
    Backbone,
    tmpl
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
             alert("show main");
        },
        hide: function () {
            alert("hide main");
        }

    });

    return new View();
});