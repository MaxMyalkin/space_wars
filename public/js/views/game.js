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
) {

    var View = Backbone.View.extend({
        el: "#game",
        template: tmpl,
        _name: "game",
        initialize: function() {
            this.render();
            this.$el.hide();
            var self = this;
            $(document).on("createGame", function(event) {
                self.game = new Game(event.resource);
                self.show();
            });
        },
        render: function() {
            this.$el.html(this.template);
            $(".overlay").hide();
        },

        show: function() {
            $.event.trigger({
                type: "show",
                _name: this._name
            });

            if (this.resources === undefined || !this.resources.loaded) {
                this.$el.hide();
                this.resources = new Resource();
                $('#loadingForm').show();
            } else {
                this.$el.show();
            }
        },
        hide: function() {
            this.$el.hide();
        }

    });

    $('#gameOverForm').on("submit", function(event) {
        event.preventDefault();
        var data = $(this).serialize();
        var name = $("#nameField").val();
        var score = $("#scoreField").val();
        if (name == '') {
            $("#formError").html("Type your name");
        } else {
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
                    window.location = "/#scoreboard";
                    $('.btn').prop("disabled", false);
                    $('#nameField').prop("disabled", false);
                    formManager.showSelectForm(Game);
                    $('#gameOver').hide();
                },
                error: function(response) {
                    var scores = Storage.getJSON('scores');
                    scores.push(player);
                    Storage.setJSON('scores', scores);
                    window.location = "/#scoreboard";
                    $('.btn').prop("disabled", false);
                    $('#nameField').prop("disabled", false);
                    formManager.showSelectForm(Game);
                    $('#gameOver').hide();
                }
            });
        };
    });
    return new View();
});