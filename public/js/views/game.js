define([
    'backbone',
    'tmpl/game',
    'game/game',
    'views/viewManager',
    'game/resources'
], function(
    Backbone,
    tmpl,
    Game,
    ViewManager,
    Resource
) {

    var View = Backbone.View.extend({
        el: "#game",
        template: tmpl,
        _name: "game",
        initialize: function() {
            this.render();
            this.$el.hide();
            var self = this;
            $(document).on("createGame", function(event) {
                self.game = new Game(event.resource);
                self.show();
            });
        },
        render: function() {
            this.$el.html(this.template);
            $(".overlay").hide();
        },

        show: function() {
            $.event.trigger({
                type: "show",
                _name: this._name
            });

            if (this.resources === undefined) {
                this.$el.hide();
                this.resources = new Resource();
                $('.loader').show();
            } else {
                this.$el.show();
            }
        },
        hide: function() {
            this.$el.hide();
        }

    });

    return new View();
});