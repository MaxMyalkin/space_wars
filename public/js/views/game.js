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
){
 
    var View = Backbone.View.extend({
        el: "#game",
        template: tmpl,
        _name: "game",
        initialize: function () {
            this.hide();
            // ... 
            this.resources = new Resource();
            // ...
        },
        render: function () {
            this.$el.html(this.template);      
            $(".overlay").hide();
        },
        show: function () {

            this.render();
            this.game = Game(this.resources); 
            $.event.trigger({
                type: "show",
                _name: this._name
            }); 
            this.$el.show();
        },
        hide: function () {
        	this.game = null;
            this.$el.hide();
        }
 
    });

    var view = new View();
    return view;
});