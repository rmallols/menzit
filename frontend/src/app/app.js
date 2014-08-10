'use strict';
var app = angular.module('app', ['ngAnimate']);

app.config(function ($locationProvider, $stateProvider, $urlRouterProvider) {

    $locationProvider.html5Mode(true);

    $stateProvider
        .state('app', {
            templateUrl: "/src/app/app.html",
            controller: 'AppCtrl',
            resolve: {
                session: ['http', 'session', function (http, session) {
                    return session.getSession();
                }]
            }
        })
        .state('app.categories', {
            url: "/categories",
            templateUrl: "/src/app/categories/categories.html",
            controller: 'CategoriesCtrl'
        })
        .state('app.test', {
            url: "/categories/:categoryId/test",
            templateUrl: "/src/app/test/test.html",
            controller: 'TestCtrl'
        })
        .state('app.admin', {
            url: "/admin",
            templateUrl: "/src/app/admin/admin.html",
            controller: 'AdminCtrl',
            data: {
                groupId: 'admin'
            }
        });

    $urlRouterProvider.otherwise("/");
});