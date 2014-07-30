'use strict';

app.config(function ($stateProvider) {

    $stateProvider
        .state('app.admin.tenant', {
            url: "/tenant",
            templateUrl: "/src/app/admin/tenant/tenant.html",
            controller: 'TenantCtrl',
            data: {
                subGroupId: 'tenant'
            }
        })
        .state('app.admin.categories', {
            url: "/categories",
            templateUrl: "/src/app/admin/categories/categoriesAdmin.html",
            controller: 'CategoriesAdminCtrl',
            data: {
                subGroupId: 'categories'
            }
        })
        .state('app.admin.addCategory', {
            url: "/categories/add",
            templateUrl: "/src/app/admin/categories/categoryAdmin.html",
            controller: 'CategoryAddAdminCtrl',
            data: {
                subGroupId: 'categories'
            }
        })
        .state('app.admin.editCategory', {
            url: "/categories/edit/:categoryId",
            templateUrl: "/src/app/admin/categories/categoryAdmin.html",
            controller: 'CategoryEditAdminCtrl',
            resolve: {
                category: ['$stateParams', 'http', function ($stateParams, http) {
                    return http.get('/rest/categories/' + $stateParams.categoryId);
                }]
            },
            data: {
                subGroupId: 'categories'
            }
        })
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
        .state('app.admin.users', {
            url: "/users",
            templateUrl: "/src/app/admin/users/usersAdmin.html",
            controller: 'UsersAdminCtrl',
            data: {
                subGroupId: 'users'
            }
        })
        .state('app.admin.addUser', {
            url: "/users/add",
            templateUrl: "/src/app/admin/users/userAdmin.html",
            controller: 'UserAddAdminCtrl',
            data: {
                subGroupId: 'users'
            }
        })
        .state('app.admin.editUser', {
            url: "/users/edit/:userId",
            templateUrl: "/src/app/admin/users/userAdmin.html",
            controller: 'UserEditAdminCtrl',
            data: {
                subGroupId: 'users'
            }
        });
});