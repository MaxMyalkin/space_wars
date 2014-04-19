define([
    'backbone',
    'tmpl/main',
    'views/viewManager',
], function(
    Backbone,
    tmpl,
    viewManager
) {

    var View = Backbone.View.extend({
        template: tmpl,
        el: "#main",
        _name: "main",
        initialize: function() {
            this.render();
            this.hide();
            $('.loader').hide();
        },

        render: function() {
            this.$el.html(this.template);
        },

        show: function() {
            $.event.trigger({
                type: "show",
                _name: this._name
            });
            this.$el.show();
        },

        hide: function() {
            this.$el.hide();
        }

    });

    var view = new View();
    return view;
});