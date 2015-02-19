'use strict';

app.config(function ($stateProvider) {

    $stateProvider

        .state('app.admin.categories', {
            url: "/categories",
            templateUrl: "categoriesAdmin.html",
            controller: 'CategoriesAdminCtrl',
            pageTitle: 'Admin categories',
            data: {
                groupId: 'adminTests'
            }
        })

        .state('app.admin.addCategory', {
            url: "/categories/add",
            templateUrl: "categoryAdmin.html",
            controller: 'CategoryAddAdminCtrl',
            pageTitle: 'Add a category',
            data: {
                groupId: 'adminTests'
            }
        })

        .state('app.admin.editCategory', {
            url: "/categories/edit/:categoryId",
            templateUrl: "categoryAdmin.html",
            controller: 'CategoryEditAdminCtrl',
            pageTitle: 'Edit category',
            resolve: {
                category: ['$stateParams', 'http', function ($stateParams, http) {
                    return http.get('/rest/categories/' + $stateParams.categoryId);
                }]
            },
            data: {
                groupId: 'adminTests'
            }
        });
});