var mainscreen = $('#mainscreen');
var tokenForm = $('#tokenForm');
var errorForm = $('#errorForm');
var controls = $('#controls');
var tokenError = $('#tokenError');
var error = $('#error');

var init = function() {
    if (!sessionStorage.getItem('guid_joystick')) {
        mainscreen.show();
        tokenForm.show();
        errorForm.hide();
        controls.hide();
    } else {
        reconnect.call(this);
    }
};

var reconnect = function() {
    console.log('reconnect');
    var self = this;
    if (sessionStorage.getItem('guid_joystick')) {
        this.bind({
            guid: sessionStorage.getItem('guid_joystick')
        }, function(data) {
            console.log(data);
            if (data.status == 'success') {
                console.log('rec ok');
                sessionStorage.setItem('guid_joystick', data.guid);
                mainscreen.show();
                errorForm.hide();
                tokenForm.hide();
                controls.show();
            } else if (data.status == 'undefined guid') {
                // Начинаем все заново
                console.log('rec bad');
                sessionStorage.removeItem('guid_joystick');
                init.call(self);
            }
        });
    } else {
        mainscreen.show();
        errorForm.hide();
    }
};

var disconnect = function() {
    console.log('disconnect');
    mainscreen.hide();
    errorForm.show();
    error.html('server unavailable');
};

var connect = function() {
    console.log('connect');
    if (sessionStorage.getItem('guid_joystick')) {
        this.bind({
            guid: sessionStorage.getItem('guid_joystick')
        }, function(data) {
            console.log(data);
            if (data.status == 'success') {
                console.log('conn ok');
                sessionStorage.setItem('guid_joystick', data.guid);
                mainscreen.show();
                errorForm.hide();
                tokenForm.hide();
                controls.show();
            } else if (data.status == 'undefined guid') {
                console.log('conn bad');
                sessionStorage.removeItem('guid_joystick');
                init.call(self);
            }
        });
    } else {
        mainscreen.show();
        errorForm.hide();
        tokenForm.show();
        controls.hide();
    }
};