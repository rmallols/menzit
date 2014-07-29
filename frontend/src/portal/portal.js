'use strict';

var portal = angular.module('portal', ['ui.router']);

portal.config(function ($locationProvider, $stateProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(true);

    $stateProvider
        .state('portal', {
            templateUrl: "/src/portal/portal.html",
            controller: 'PortalCtrl'
        })
        .state('portal.home', {
            url: "/home",
            templateUrl: "/src/portal/home/home.html",
            controller: 'HomeCtrl'
        });

    $urlRouterProvider.otherwise("/");
});