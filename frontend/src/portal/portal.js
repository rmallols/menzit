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
            controller: 'HomeCtrl',
            pageTitle: 'Home'
        })

        .state('portal.howItWorks', {
            url: "/how-it-works",
            templateUrl: "howItWorks.html",
            controller: 'HowItWorksCtrl',
            pageTitle: 'How it works'
        })

        .state('portal.contact', {
            url: "/contact",
            templateUrl: "contact.html",
            controller: 'ContactCtrl',
            pageTitle: 'Contact'
        });

    $urlRouterProvider.otherwise("/");
});