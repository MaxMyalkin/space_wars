define([
    'backbone',
    'tmpl/scoreTable',
    'collections/scores'
], function(
    Backbone,
    tmpl,
    Scoreboard
){
 
    var View = Backbone.View.extend({
        template: tmpl,
        el: "#scoreTable",
        
        initialize: function () {
            _.bindAll(this, "render", "show", "hide");
        },

        render: function () {
            var self = this;

            $.ajax({
                url : '/scores?limit=10',
                type: 'get',
                dataType: 'JSON',
                success: function(response)
                {
                    Scoreboard.url = "/scores";
                    Scoreboard.fetch();
                    self.$el.html(self.template({scoreboard: response}));
                }
            })
            .fail(
                function(msg){
                    $("#error").html("Server unreachable");
                }
            )
        },

        show: function () {
        	this.render();
        },

        hide: function () {
        	
        }
 
    });

    return View;

});