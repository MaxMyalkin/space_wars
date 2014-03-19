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
){
 
    var View = Backbone.View.extend({
        template: tmpl,
        el: "#scoreTable",
        
        initialize: function () {
            _.bindAll(this, "render", "show", "hide");
        },

        render: function () {
            Storage.update();
            var self = this;
            Scoreboard.url = "/scores";
            Scoreboard.fetch();        
            $.ajax({
                url : '/scores?limit=10',
                type: 'get',
                dataType: 'JSON',
                success: function(response)
                {
                    self.$el.html(self.template({scoreboard: response}));
                    $("#error").html("");
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