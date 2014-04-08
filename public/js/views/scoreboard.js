define([
    'backbone',
    'tmpl/scoreboard',
    'collections/scores',
    'models/score',
    'views/viewManager',
    'views/scoreTable'
], function(
    Backbone,
    tmplScore,
    Scoreboard,
    Player,
    viewManager,
    ScoreTable
) {
    var ScoreboardView = Backbone.View.extend({
        el: "#scoreboard",
        template: tmplScore,
        _name: "scoreboard",

        initialize: function() {
            this.render();
            this.scoreTable = new ScoreTable(); //Только после рендера основной вьюшки можем создать scoreTable
            this.hide();
        },
        render: function() {
            this.$el.html(this.template);
        },
        show: function() {
            this.$el.show();
            this.scoreTable.show();
            $.event.trigger({
                type: "show",
                _name: this._name
            });

        },
        hide: function() {
            this.$el.hide();
        }
    });
    var view = new ScoreboardView();
    return view;

});