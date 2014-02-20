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
<<<<<<< HEAD

=======
>>>>>>> 705f1bfe13878ca3254cc463310c41f0f26817e5
        }

    });

    return new View();
});