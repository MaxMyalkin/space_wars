define([
    'backbone',
    'tmpl/forms/gameOver',
    'views/viewManager',
    'models/score',
    'collections/scores',
    'localStorageFunc',
    'formManager'
], function(
    Backbone,
    tmpl,
    ViewManager,
    Score,
    Scoreboard,
    Storage,
    formManager
) {

    var View = Backbone.View.extend({
        el: "#gameOver",
        template: tmpl,

        initialize: function() {
            _.bindAll(this, "render", "show", "hide");
        },

        render: function(game) {
            this.$el.html(this.template({
                score: game.player.score
            }));
            var gameOverForm = this;
            $('.btn_close').click(function() {
                gameOverForm.hide()
            });
            $('#submitBtn').click(function(event) {
                event.preventDefault();
                var data = $(this).serialize();
                var name = $("#nameField").val();
                var score = $("#scoreField").val();
                if (name != "") {
                    var player = new Score({
                        name: name,
                        score: score
                    });
                    Scoreboard.add(player);
                    player = {
                        'name': name,
                        'score': score
                    }
                    $('.btn').prop("disabled", true);
                    $('#nameField').prop("disabled", true);
                    $.ajax({
                        url: '/scores',
                        type: 'post',
                        data: data,
                        dataType: 'json',
                        success: function(response) {
                            $('.btn').prop("disabled", false);
                            window.location = "#scoreboard";
                            $('.btn').prop("disabled", false);
                            $('#nameField').prop("disabled", false);
                            formManager.showSelectForm(game);
                            $('#gameOver').hide();
                        },
                        error: function(response) {
                            var scores = Storage.getJSON('scores');
                            scores.push(player);
                            Storage.setJSON('scores', scores);
                            window.location = "#scoreboard";
                            $('.btn').prop("disabled", false);
                            $('#nameField').prop("disabled", false);
                            formManager.showSelectForm(game);
                            $('#gameOver').hide();
                        }
                    });
                }
            });


        },

        show: function(score) {
            $('.overlay').show();
            this.render(score);
            this.$el.show();
        },

        hide: function() {
            $('.overlay').hide();
            this.$el.hide();
        }

    });

    return View;
});