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
            _.bindAll(this, "render", "show", "hide");
        },

        render: function() {
            Storage.update();
            Scoreboard.url = "/scores";
            Scoreboard.fetch();
            this.$el.html('<img src="/images/ajax-loader.gif" alt="Loading..." />');
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
                    },

                    error: function(response) {
                        self.hide();
                        $("#scoreError").html("Server unreachable");
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