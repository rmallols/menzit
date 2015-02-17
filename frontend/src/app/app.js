'use strict';
var app = angular.module('app', ['ngAnimate', 'ngTagsInput', 'ngSanitize']);

app.config(function ($locationProvider, $stateProvider, $urlRouterProvider) {

    $locationProvider.html5Mode(true);

    $stateProvider

        .state('app', {
            templateUrl: "app.html",
            controller: 'AppCtrl',
            resolve: {
                userSession: ['session', function (session) {
                    return session.getSession();
                }]
            }
        })

        .state('app.categories', {
            url: "/categories",
            templateUrl: "categories.html",
            controller: 'CategoriesCtrl',
            data: {
                groupId: 'categories'
            }
        })

        .state('app.test', {
            url: "/categories/:categoryId/test",
            templateUrl: "test.html",
            controller: 'TestCtrl',
            data: {
                groupId: 'categories'
            }
        })

        .state('app.review', {
            url: "/review",
            templateUrl: "review.html",
            controller: 'ReviewCtrl',
            resolve: {
                questions: ['http', function (http) {
                    return http.get('/rest/incorrectAnswers');
                }]
            },
            data: {
                groupId: 'review'
            }
        })

        .state('app.reviewQuestion', {
            url: "/review/:questionId",
            templateUrl: "question.html",
            controller: 'ReviewQuestionCtrl',
            resolve: {
                question: ['$stateParams', 'http', function ($stateParams, http) {
                    return http.get('/rest/tests/' + $stateParams.questionId);
                }]
            },
            data: {
                groupId: 'review'
            }
        })

        .state('app.admin', {
            url: "/admin",
            templateUrl: "admin.html",
            controller: 'AdminCtrl'
        });

    $urlRouterProvider.otherwise("/");
});