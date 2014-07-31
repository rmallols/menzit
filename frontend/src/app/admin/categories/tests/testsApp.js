'use strict';

app.config(function ($stateProvider) {

    $stateProvider
        .state('app.admin.tests', {
            url: "/categories/:categoryId/tests",
            templateUrl: "/src/app/admin/categories/tests/testsAdmin.html",
            controller: 'TestsAdminCtrl',
            resolve: {
                category: ['$stateParams', 'http', function ($stateParams, http) {
                    return http.get('/rest/categories/' + $stateParams.categoryId);
                }]
            },
            data: {
                subGroupId: 'categories'
            }
        })
        .state('app.admin.addTest', {
            url: "/categories/:categoryId/tests/add",
            templateUrl: "/src/app/admin/categories/tests/testAdmin.html",
            controller: 'TestAddAdminCtrl',
            data: {
                subGroupId: 'categories'
            }
        })
        .state('app.admin.editTest', {
            url: "/categories/:categoryId/tests/edit/:testId",
            templateUrl: "/src/app/admin/categories/tests/testAdmin.html",
            controller: 'TestEditAdminCtrl',
            resolve: {
                test: ['$stateParams', 'http', function ($stateParams, http) {
                    return http.get('/rest/tests/' + $stateParams.testId);
                }]
            },
            data: {
                subGroupId: 'categories'
            }
        });
});