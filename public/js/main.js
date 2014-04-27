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
        "socket.io": "/socket.io/socket.io",
        device_orientation: "lib/deviceapi-normaliser",
        soundjs: "lib/soundjs",
        Modernizr: "lib/Modernizr"
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
    'router', 'Modernizr'
], function(
    router, Modernizr
) {
    if (!Modernizr.fontface){
        alert("no fontface supported.");
    }
    if (!Modernizr.audio){
        alert("no HTML5 Audio supported.");
    }
    if (!Modernizr.canvas){
        alert("no canvas supported.");
    }
    if (!Modernizr.localstorage){
        alert("no localstorage supported.");
    }
    if (!Modernizr.websockets){
        alert("no websockets supported.");
    }
        
    Backbone.history.start();
});