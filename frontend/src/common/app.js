'use strict';

var app = angular.module('menzit', ['ui.router']);

app.config(function ($locationProvider, $stateProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state('mz', {
            templateUrl: "/src/common/base.html",
            controller: 'BaseCtrl',
            resolve: {
                session: ['http', 'session', function (http, session) {
                    return session.getSession();
                }]
            }
        })
        .state('mz.categories', {
            url: "/categories",
            templateUrl: "/src/app/categories/categories.html",
            controller: 'CategoriesCtrl'
        })
        .state('mz.runTest', {
            url: "/categories/:categoryId/runTest",
            templateUrl: "/src/app/question/question.html",
            controller: 'QuestionCtrl'
        })
        .state('mz.admin', {
            url: "/admin",
            templateUrl: "/src/app/admin/admin.html",
            controller: 'AdminCtrl',
            data: {
                groupId: 'admin'
            }
        });
});