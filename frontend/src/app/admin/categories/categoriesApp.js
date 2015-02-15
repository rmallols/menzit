'use strict';

app.config(function ($stateProvider) {

    $stateProvider

        .state('app.admin.categories', {
            url: "/categories",
            templateUrl: "categoriesAdmin.html",
            controller: 'CategoriesAdminCtrl',
            data: {
                subGroupId: 'categories'
            }
        })

        .state('app.admin.addCategory', {
            url: "/categories/add",
            templateUrl: "categoryAdmin.html",
            controller: 'CategoryAddAdminCtrl',
            data: {
                subGroupId: 'categories'
            }
        })

        .state('app.admin.editCategory', {
            url: "/categories/edit/:categoryId",
            templateUrl: "categoryAdmin.html",
            controller: 'CategoryEditAdminCtrl',
            resolve: {
                category: ['$stateParams', 'http', function ($stateParams, http) {
                    return http.get('/rest/categories/' + $stateParams.categoryId);
                }]
            },
            data: {
                subGroupId: 'categories'
            }
        });
});