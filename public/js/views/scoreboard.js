define([
    'backbone',
    'tmpl/scoreboard',
    'collections/scores',
    'models/score',
    'views/viewManager',
], function(
    Backbone,
    tmplScore,
    Scoreboard,
    Player,
    viewManager 
){
    var ScoreboardView = Backbone.View.extend({
        el: "#scoreboard",
        template: tmplScore,
        _name: "scoreboard",
        initialize: function () {
            this.render();
            this.hide();
        },
        render: function () {
        	Scoreboard.url = '/scores'
        	Scoreboard.fetch();
            this.$el.html(this.template({scoreboard: Scoreboard.models}));
        },
        show: function () {
        	this.render();
            $.event.trigger({
                type: "show",
                _name: this._name
            }); 
            this.$el.show();
        },
        hide: function () {
            this.$el.hide();
        }
    });
    var view = new ScoreboardView();
    return view;

});