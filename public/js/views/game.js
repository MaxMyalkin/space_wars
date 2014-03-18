define([
    'backbone',
    'tmpl/game',
    'game/game',
    'views/viewManager'
], function(
    Backbone,
    tmpl,
    Game,
    ViewManager
){
 
    var View = Backbone.View.extend({
        el: "#game",
        template: tmpl,
        _name: "game",
        initialize: function () {
            this.hide();
        },
        render: function () {
            this.$el.html(this.template);      
            $("#overlay").hide();
        },
        show: function () {

            this.render();
            this.game = Game(); 
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