require.config({

    urlArgs: "_=" + (new Date()).getTime(),
    baseUrl: "js",
    paths: {
        jquery: "lib/jquery",
        underscore: "lib/underscore",
        backbone: "lib/backbone",
        classy: "lib/classy",
        preload: "lib/preload.min",
        Connector: "lib/Connector",
        FnQuery: "lib/FnQuery",
        "socket.io": "lib/socket.io",
        device_orientation: "lib/deviceapi-normaliser",
        soundjs: "lib/soundjs",
        Modernizr: "lib/Modernizr",
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        'classy': {
            exports: 'Class'
        },
        'preload': {
            exports: 'createjs'
        },
        "socket.io": {
            exports: "io"
        },
        "device_orientation": {
            exports: "deviceOrientation"
        },
        'soundjs': {
            exports: 'createjs'
        },
        "Modernizr": {
            exports: 'Modernizr'
        }

    }
});


define([
    'router'
], function(
    router
) {
    Backbone.history.start();
});