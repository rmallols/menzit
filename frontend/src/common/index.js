'use strict';

var menzit = angular.module('menzit', ['portal', 'app', 'ui.router', 'templates-main', 'ngSanitize']);

//Less vendor library (has to be loaded at the end of the stylesheet chain
less = {
    env: "development",
    logLevel: 0
};