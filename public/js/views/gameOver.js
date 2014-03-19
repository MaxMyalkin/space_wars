define([
    'backbone',
    'tmpl/gameOver',
    'views/viewManager',
    'models/score',
    'collections/scores',
    'localStorageFunc'
], function(
    Backbone,
    tmpl,
    ViewManager,
    Score,
    Scoreboard,
    Storage
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
            $('#gameOverForm').on("submit" , postScores);

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

    function postScores(event) {
            event.preventDefault();
            var data = $(this).serialize();
            var _name = $("#nameField").val();
            var _score = $(scoreField).val();
            var _player = {
                'name': _name,
                'score': _score
            }
            if (_name != ""){
                var player = new Score({name: _name, score: _score});
                Scoreboard.add(player);
                $('.btn').prop("disabled", true);
                $.ajax({
                    url : '/scores',
                    type: 'post',
                    data: data,
                    dataType: 'json',
                    success: function(msg){
                        var scores = Storage.getJSON('scores');
                        var player = JSON.stringify(_player);
                        scores = scores.substring(0, scores.length - 1);
                        scores = scores + player + ",]";
                        Storage.setJSON('scores', scores);
                    }
                })
                .fail(
                    function(msg){
                        
                    }
                )
                $('.btn').prop("disabled", false);
                window.location = "/#scoreboard";
            }
            else {
                $("#error").html("Type your name");
            }
            
    }

    

    return View;
});