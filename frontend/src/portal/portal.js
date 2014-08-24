'use strict';

var portal = angular.module('portal', ['ui.router']);

portal.config(function ($locationProvider, $stateProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(true);

    $stateProvider
        .state('portal', {
            templateUrl: "portal.html",
            controller: 'PortalCtrl'
        })
        .state('portal.home', {
            url: "/home",
            templateUrl: "home.html",
            controller: 'HomeCtrl'
        });

    $urlRouterProvider.otherwise("/");
});