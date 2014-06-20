define([
    'backbone',
    'tmpl/main',
    'views/viewManager',
    'soundjs',
    'lib/share'
], function(
    Backbone,
    tmpl,
    viewManager,
    SoundJS
) {

    var View = Backbone.View.extend({
        template: tmpl,
        el: "#main",
        _name: "main",
        initialize: function() {
            $('#loadingForm').hide();
            this.render();
            this.hide();
            $(".info-slide").mouseenter(function() {
                $(this).animate({
                    left: 0
                });
                $('.info-slide .arrow').html("&lt");
            }).mouseleave(function() {
                $(this).animate({
                    left: -$(this).outerWidth() + 20
                });
                $('.info-slide .arrow').html("&gt");
            });
            soundFlag = true;
            $('#toggle-sound').click(function() {
                var img = $("#toggle-sound img");
                if (soundFlag) {
                    SoundJS.Sound.setMute(true);
                    soundFlag = false;
                    img.attr("src", "/images/soundoff.png");
                } else {
                    SoundJS.Sound.setMute(false);
                    soundFlag = true;
                    img.attr("src", "/images/soundon.png");
                }
            });
        },

        render: function() {
            this.$el.html(this.template);
        },

        show: function() {
            $.event.trigger({
                type: "show",
                _name: this._name
            });
            this.$el.show();
        },

        hide: function() {
            this.$el.hide();
        }

    });

    var view = new View();
    return view;
});