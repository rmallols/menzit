'use strict';

var app = angular.module('menzit', ['ui.router']);

app.config(function ($locationProvider, $stateProvider, $urlRouterProvider) {

    //Avoid using hashes on the URL, whenever the browser supports this feature
    $locationProvider.html5Mode(true);

    // For any unmatched url, redirect to the home page
    $urlRouterProvider.otherwise("/");

    // Now set up the states
    $stateProvider
        .state('home', {
            url: "/",
            templateUrl: "/src/app/home/home.html",
            controller: 'HomeCtrl'
        })
        .state('categories', {
            url: "/categories",
            templateUrl: "/src/app/categories/categories.html",
            controller: 'CategoriesCtrl'
        })
        .state('runTest', {
            url: "/categories/:categoryId/runTest",
            templateUrl: "/src/app/question/question.html",
            controller: 'QuestionCtrl'
        })
        .state('admin', {
            url: "/admin",
            templateUrl: "/src/app/admin/admin.html",
            controller: 'AdminCtrl'
        })
        .state('admin.tenant', {
            url: "/tenant",
            templateUrl: "/src/app/admin/tenant/tenant.html",
            controller: 'TenantCtrl'
        })
        .state('admin.tests', {
            url: "/tests",
            templateUrl: "/src/app/admin/tests/tests.html",
            controller: 'TestsCtrl'
        })
        .state('admin.users', {
            url: "/users",
            templateUrl: "/src/app/admin/users/users.html",
            controller: 'UsersCtrl'
        });
});