define([
    'backbone',
    'tmpl/gameOver',
    'views/viewManager',
], function(
    Backbone,
    tmpl,
    ViewManager
){
 
    var View = Backbone.View.extend({
        el: "#gameOver",
        template: tmpl,
        _name: "gameOver",
        initialize: function () {
            
            _.bindAll(this, "render", "show", "hide");
        },
        render: function () {
            this.$el.html(this.template);
        },
        show: function () {
            this.render();
            this.$el.show();
        },
        hide: function () {
            this.$el.hide();
        }
 
    });

    return View;
});