define([
    'backbone',
    'tmpl/scoreboard',
    'tmpl/player'
    //'collections/scores',
    //'models/score'
], function(
    Backbone,
    tmpl,
    tmpl_player
    //player_collection
){



    var PlayerModel = Backbone.Model.extend({
    });


    var PlayerCollection = Backbone.Collection.extend({
            model: PlayerModel
    });

    var p = new PlayerModel();


    var Players = new PlayerCollection(
        [
            { name: "Contact 1", score: "10" },
            { name: "Contact 2", score: "20" },
            { name: "Contact 3", score: "30" },
            { name: "Contact 4", score: "40" } 
        ]
    );

    var ScoreView = Backbone.View.extend({
        el: $('.score__item'),
        className: 'score__item',
        tagName: 'li',
        template: tmpl_player,
        initialize: function() {
            this.render();
        },
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

    var ScoreboardView = Backbone.View.extend({
        el: $("#page"),
        template: tmpl,
        collection : Players,
        initialize: function () {
            this.render();  
        },
        render: function () {
            this.$el.html(this.template());
            this.collection.each(function(player){
                var scoreView = new ScoreView({
                    model: player
                });
                this.$el.append(scoreView.render().el);
            }, this);
            return this;
           
        },
        show: function () {

        },
        hide: function () {
        
        }

    });

    return new ScoreboardView();
    
});