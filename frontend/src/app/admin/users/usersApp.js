'use strict';

app.config(function ($stateProvider) {

    $stateProvider
        .state('app.admin.users', {
            url: "/users",
            templateUrl: "usersAdmin.html",
            controller: 'UsersAdminCtrl',
            data: {
                subGroupId: 'users'
            }
        })
        .state('app.admin.addUser', {
            url: "/users/add",
            templateUrl: "userAdmin.html",
            controller: 'UserAddAdminCtrl',
            data: {
                subGroupId: 'users'
            }
        })
        .state('app.admin.editUser', {
            url: "/users/edit/:userId",
            templateUrl: "userAdmin.html",
            controller: 'UserEditAdminCtrl',
            data: {
                subGroupId: 'users'
            }
        });
});