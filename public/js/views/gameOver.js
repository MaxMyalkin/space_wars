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
        _name: "gameOver",
        
        initialize: function () {
            _.bindAll(this, "render", "show", "hide");
        },

        render: function (score) {
            this.$el.html(this.template({score: score}));
            var form = $('#gameOverForm');
            form.on("submit" , cobcobcobe);
        },

        show: function (score) {
            this.render(score);
            this.$el.show();
        },

        hide: function () {
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
            
            $.ajax({
                url : '/scores',
                type: 'post',
                data: data,
                dataType: 'json',
                success: function(msg)
                {
                    window.location = "/#scoreboard";
                }
            })
            .fail(
                function(msg){
                    $("#error").html("Type your name");
                }
            )
    }

    return View;
});