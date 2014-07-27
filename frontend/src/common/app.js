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
                session: ['http', function (http) {
                    return http.get('/rest/getSession/');
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
        })
        .state('mz.admin.tenant', {
            url: "/tenant",
            templateUrl: "/src/app/admin/tenant/tenant.html",
            controller: 'TenantCtrl'
        })
        .state('mz.admin.categories', {
            url: "/categories",
            templateUrl: "/src/app/admin/categories/categories.html",
            controller: 'AdminCategoriesCtrl'
        })
        .state('mz.admin.users', {
            url: "/users",
            templateUrl: "/src/app/admin/users/users.html",
            controller: 'UsersCtrl'
        });
});