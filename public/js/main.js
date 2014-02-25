require.config({
    urlArgs: "_=" + (new Date()).getTime(),
    baseUrl: "js",
    paths: {
        jquery: "lib/jquery",
        underscore: "lib/underscore",
        backbone: "lib/backbone",
        classy: "lib/classy",
        easeljs: "lib/easeljs"
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        'classy':{
            exports: 'Class'
        },
        'easeljs': {
            exports: 'createjs'
        }
    }
});

define([
    'router'
], function(
    router
){
    Backbone.history.start();
});
