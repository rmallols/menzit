'use strict';

app.config(function ($stateProvider) {

    $stateProvider

        .state('app.admin.tests', {
            url: "/categories/:categoryId/tests",
            templateUrl: "testsAdmin.html",
            controller: 'TestsAdminCtrl',
            resolve: {
                category: ['$stateParams', 'http', function ($stateParams, http) {
                    return http.get('/rest/categories/' + $stateParams.categoryId);
                }]
            },
            data: {
                groupId: 'adminTests'
            }
        })

        .state('app.admin.addTest', {
            url: "/categories/:categoryId/tests/add",
            templateUrl: "testAdmin.html",
            controller: 'TestAddAdminCtrl',
            data: {
                groupId: 'adminTests'
            }
        })

        .state('app.admin.editTest', {
            url: "/categories/:categoryId/tests/edit/:testId",
            templateUrl: "testAdmin.html",
            controller: 'TestEditAdminCtrl',
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