define([
    'backbone',
    'tmpl/gameOver',
    'views/viewManager',
    'cobcobcobe'
], function(
    Backbone,
    tmpl,
    ViewManager,
    Cobcobcobe
){
 
    var View = Backbone.View.extend({
        el: "#gameOver",
        template: tmpl,
        _name: "gameOver",
        initialize: function () {
            
            _.bindAll(this, "render", "show", "hide");
        },
        render: function (score) {
            this.$el.html(this.template({score: score}));
            var game = this;
            $('.btn_close').click( function() { game.hide() } );
            $('#gameOverForm').on("submit" , Cobcobcobe);
        },
        show: function (score) {
        	$('#overlay').show();
            this.render(score);
            this.$el.show();
        },
        hide: function () {
        	$('#overlay').hide();
            this.$el.hide();
        }
 
    });

    return View;
});