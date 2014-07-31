'use strict';

app.config(function ($stateProvider) {

    $stateProvider
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