define([
    'backbone',
    'tmpl/scoreTable',
    'collections/scores',
    'localStorageFunc'
], function(
    Backbone,
    tmpl,
    Scoreboard,
    Storage
) {

    var View = Backbone.View.extend({
        template: tmpl,
        el: "#scoreTable",

        initialize: function() {
            $("#loading").hide();
            _.bindAll(this, "render", "show", "hide");
        },

        render: function() {
            $('#selectForm').show();
            $('#gameDiv').hide();
            Storage.update();
            Scoreboard.url = "/scores";
            Scoreboard.fetch();
            $("#loading").show();
            $("#scoreError").html("");
            this.$el.hide();
            var self = this;
            setTimeout(function() {
                $.ajax({
                    url: '/scores?limit=10',
                    type: 'get',
                    dataType: 'JSON',

                    success: function(response) {

                        self.$el.html(self.template({
                            scoreboard: response
                        }));
                        $("#scoreError").html("");
                        self.$el.show();
                        $("#loading").hide();
                    },

                    error: function(response) {
                        self.hide();
                        $("#scoreError").html("Server unavailable");
                        $("#loading").hide();
                    }
                })
            }, 1000)

        },

        show: function() {
            this.render();
        },

        hide: function() {
            this.$el.hide();
        }
    });



    return View;

});