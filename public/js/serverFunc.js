define(['formManager'],
    function(formManager) {
        var init = function() {
            if (!sessionStorage.getItem('guid')) {
                this.server.getToken(function(data) {
                    formManager.showTokenForm(data);
                });
            } else {
                reconnect.call(this);
            }
        };

        var reconnect = function() {
            if (!this.pauseFlag)
                this.pauseGame();
            var self = this;
            if (sessionStorage.getItem('guid')) {
                this.server.bind({
                    guid: sessionStorage.getItem('guid')
                }, function(data) {
                    if (data.status == 'success') {
                        sessionStorage.setItem('guid', data.guid);
                        $('#gameDiv').show();
                        $('.overlay').hide();
                    } else if (data.status == 'undefined guid') {
                        sessionStorage.removeItem('guid');
                        init.call(self);
                    }
                });
            }
        };

        var disconnect = function() {
            this.endGame();
            gameDiv.hide();
            overlay.show();
            formManager.showErrorForm('server unavailable');
        };

        return {
            init: init,
            reconnect: reconnect,
            disconnect: disconnect
        }
    });