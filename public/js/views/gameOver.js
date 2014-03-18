define([
    'backbone',
    'tmpl/gameOver',
    'views/viewManager',
    'models/score',
    'collections/scores'
], function(
    Backbone,
    tmpl,
    ViewManager,
    Score,
    Scoreboard
){
 
    var View = Backbone.View.extend({
        el: "#gameOver",
        template: tmpl,
        
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

    function cobcobcobe(event) {
            event.preventDefault();

            var data = $(this).serialize();
            var _name = $("#nameField").val();
            if (_name != ""){
                var player = new Score({name: _name, score: $(scoreField).val()});
                Scoreboard.add(player);
            }
            $('.btn').prop("disabled", true);
            $.ajax({
                url : '/scores',
                type: 'post',
                data: data,
                dataType: 'json',
                success: function(msg)
                {
                    $('.btn').prop("disabled", false);
                    window.location = "/#scoreboard";
                }
            })
            .fail(
                function(msg){
                    $("#error").html("Type your name");
                    $('.btn').prop("disabled", false);
                }
            )
    }

    return View;
});