'use strict';

app.config(function ($stateProvider) {

    $stateProvider
        .state('mz.admin.tenant', {
            url: "/tenant",
            templateUrl: "/src/app/admin/tenant/tenant.html",
            controller: 'TenantCtrl',
            data: {
                subGroupId: 'tenant'
            }
        })
        .state('mz.admin.categories', {
            url: "/categories",
            templateUrl: "/src/app/admin/categories/categoriesAdmin.html",
            controller: 'CategoriesAdminCtrl',
            data: {
                subGroupId: 'categories'
            }
        })
        .state('mz.admin.addCategory', {
            url: "/categories/add",
            templateUrl: "/src/app/admin/categories/categoryAdmin.html",
            controller: 'CategoryAddAdminCtrl',
            data: {
                subGroupId: 'categories'
            }
        })
        .state('mz.admin.editCategory', {
            url: "/categories/edit/:categoryId",
            templateUrl: "/src/app/admin/categories/categoryAdmin.html",
            controller: 'CategoryEditAdminCtrl',
            data: {
                subGroupId: 'categories'
            }
        })
        .state('mz.admin.users', {
            url: "/users",
            templateUrl: "/src/app/admin/users/users.html",
            controller: 'UsersCtrl',
            data: {
                subGroupId: 'users'
            }
        });
});