'use strict';

app.config(function ($stateProvider) {

    $stateProvider

        .state('app.admin.tests', {
            url: "/categories/:categoryId/tests",
            templateUrl: "testsAdmin.html",
            controller: 'TestsAdminCtrl',
            pageTitle: 'Manage tests',
            resolve: {
                category: ['$stateParams', 'http', function ($stateParams, http) {
                    return http.get('/rest/categories/' + $stateParams.categoryId);
                }]
            },
            data: {
                groupId: 'adminTests'
            }
        })

        .state('app.admin.add-quizTest', {
            url: "/categories/:categoryId/tests/add",
            templateUrl: "testAdmin.html",
            controller: 'TestAddAdminCtrl',
            pageTitle: 'Add quiz test',
            data: {
                groupId: 'adminTests'
            }
        })

        .state('app.admin.add-speechTest', {
            url: "/categories/:categoryId/tests/speech/add",
            templateUrl: "speechTestAdmin.html",
            controller: 'SpeechTestAddAdminCtrl',
            pageTitle: 'Add speech test',
            data: {
                groupId: 'adminTests'
            }
        })

        .state('app.admin.edit-quizTest', {
            url: "/categories/:categoryId/tests/edit/:testId",
            templateUrl: "testAdmin.html",
            controller: 'TestEditAdminCtrl',
            pageTitle: 'Edit quiz test',
            resolve: {
                test: ['$stateParams', 'http', function ($stateParams, http) {
                    return http.get('/rest/tests/' + $stateParams.testId);
                }]
            },
            data: {
                groupId: 'adminTests'
            }
        })

        .state('app.admin.edit-speechTest', {
            url: "/categories/:categoryId/tests/speech/edit/:testId",
            templateUrl: "speechTestAdmin.html",
            controller: 'SpeechTestEditAdminCtrl',
            pageTitle: 'Edit speech test',
            resolve: {
                test: ['$stateParams', 'http', function ($stateParams, http) {
                    return http.get('/rest/tests/' + $stateParams.testId);
                }]
            },
            data: {
                groupId: 'adminTests'
            }
        });
});