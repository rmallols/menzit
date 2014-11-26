'use strict';
var app = angular.module('app', ['ngAnimate', 'ngTagsInput']);

app.config(function ($locationProvider, $stateProvider, $urlRouterProvider) {

    $locationProvider.html5Mode(true);

    $stateProvider
        .state('app', {
            templateUrl: "app.html",
            controller: 'AppCtrl',
            resolve: {
                session: ['http', 'session', function (http, session) {
                    return session.getSession();
                }]
            }
        })
        .state('app.categories', {
            url: "/categories",
            templateUrl: "categories.html",
            controller: 'CategoriesCtrl'
        })
        .state('app.test', {
            url: "/categories/:categoryId/test",
            templateUrl: "test.html",
            controller: 'TestCtrl'
        })
        .state('app.admin', {
            url: "/admin",
            templateUrl: "admin.html",
            controller: 'AdminCtrl',
            data: {
                groupId: 'admin'
            }
        });

    $urlRouterProvider.otherwise("/");
});