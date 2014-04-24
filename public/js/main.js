require.config({
    urlArgs: "_=" + (new Date()).getTime(),
    baseUrl: "js",
    paths: {
        jquery: "lib/jquery",
        underscore: "lib/underscore",
        backbone: "lib/backbone",
        classy: "lib/classy",
        preload: "lib/preload.min",
        soundjs: "lib/soundjs"
        Connector: "lib/Connector",
        FnQuery: "lib/FnQuery",
        "socket.io": "/socket.io/socket.io"
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
        'soundjs': {
            exports: 'createjs'
        "socket.io": {
            exports: "io"
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
