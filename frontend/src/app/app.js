'use strict';
var app = angular.module('app', ['ngAnimate', 'ngTagsInput']);

app.config(['$locationProvider', '$stateProvider', '$urlRouterProvider',
    function ($locationProvider, $stateProvider, $urlRouterProvider) {

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

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

            .state('app.pageNotFound', {
                url: '/page-not-found',
                templateUrl: "pageNotFound.html",
                controller: 'PageNotFoundCtrl',
                pageTitle: 'Page not found :('
            })

            .state('app.browserNotSupported', {
                url: '/browser-not-supported',
                templateUrl: "browserNotSupported.html",
                controller: 'BrowserNotSupportedCtrl',
                pageTitle: 'Browser not supported :('
            })

            .state('app.categories', {
                url: "/play",
                templateUrl: "categories.html",
                controller: 'CategoriesCtrl',
                pageTitle: 'Select a category',
                data: {
                    groupId: 'categories'
                }
            })

            .state('app.test-quiz', {
                url: "/play/:categoryId/quiz",
                templateUrl: "testQuiz.html",
                controller: 'TestQuizCtrl',
                pageTitle: 'Running a test',
                data: {
                    groupId: 'categories'
                }
            })

            .state('app.test-speech', {
                url: "/play/:categoryId/speech",
                templateUrl: "testSpeech.html",
                controller: 'TestSpeechCtrl',
                pageTitle: 'Running a test',
                data: {
                    groupId: 'categories'
                }
            })

            .state('app.review', {
                url: "/review",
                templateUrl: "review.html",
                controller: 'ReviewCtrl',
                pageTitle: 'Review tests',
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
                pageTitle: 'Review a test',
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
    }]);

app.run(['$rootScope', 'browser', function ($rootScope, browser) {
    $rootScope.userAgent = browser.getUA();
    $rootScope.$on('$stateChangeSuccess', function (event, toState) {
        $rootScope.pageTitle = toState.pageTitle + ' | menzit';
    });
}]);