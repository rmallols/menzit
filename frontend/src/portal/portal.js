'use strict';

var portal = angular.module('portal', ['ui.router']);

portal.config(['$locationProvider', '$stateProvider', '$urlRouterProvider',
function ($locationProvider, $stateProvider, $urlRouterProvider) {

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

    $stateProvider

        .state('portal', {
            templateUrl: "portal.html",
            controller: 'PortalCtrl'
        })

        .state('portal.home', {
            url: "/",
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
}]);