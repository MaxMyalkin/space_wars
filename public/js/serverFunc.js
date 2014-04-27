var gameDiv;
var selectForm;
var tokenForm;
var overlay;
var error;
var errorForm;
var token;
var hidden = [];
var shown = [];

$(document).ready(function() {
    gameDiv = $('#gameDiv');
    selectForm = $('#selectForm');
    tokenForm = $('#tokenForm');
    overlay = $('.overlay');
    error = $('#error');
    errorForm = $('#errorForm');
    token = $('#token');
});

var hideShown = function() {
    for (var i = 0; i < shown.length; i++) {
        shown[i].hide();
    }
    shown = [];
};

var saveShown = function() {
    for (var i = 0; i < shown.length; i++) {
        hidden.push(shown[i]);
    };
};

var showHidden = function() {
    for (var i = 0; i < hidden.length; i++) {
        hidden[i].show();
    }
    hidden = [];
};

var init = function() {
    if (!sessionStorage.getItem('guid')) {
        this.server.getToken(function(data) {
            hideShown();
            shown.push(tokenForm);
            tokenForm.show();
            token.html(data);
            errorForm.hide();
        });
    } else {
        reconnect.call(this);
    }
};

var reconnect = function() {
    //showHidden();
    hideShown();
    var self = this;
    if (sessionStorage.getItem('guid')) {
        this.server.bind({
            guid: sessionStorage.getItem('guid')
        }, function(data) {
            if (data.status == 'success') {
                sessionStorage.setItem('guid', data.guid);
                hideShown();
                shown.push(gameDiv);
                gameDiv.show();
                overlay.hide();
            } else if (data.status == 'undefined guid') {
                sessionStorage.removeItem('guid');
                init.call(self);
            }
        });
    } else {
        console.log('fuck'); // вывести все, что было скрыто
    }
};

var disconnect = function() {
    saveShown();
    hideShown();
    //gameDiv.hide();
    //selectForm.hide();
    //tokenForm.hide();
    shown.push(overlay);
    shown.push(errorForm);
    overlay.show();
    error.html('server unavailable');
    errorForm.show();
};