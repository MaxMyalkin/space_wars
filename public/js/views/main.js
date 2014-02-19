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
          //  var template = tmpl();
           
          //  return this;
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