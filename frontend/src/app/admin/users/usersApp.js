'use strict';

app.config(function ($stateProvider) {

    $stateProvider
        .state('app.admin.users', {
            url: "/users",
            templateUrl: "usersAdmin.html",
            controller: 'UsersAdminCtrl',
            pageTitle: 'Admin users',
            data: {
                groupId: 'adminUsers'
            }
        })
        .state('app.admin.addUser', {
            url: "/users/add",
            templateUrl: "userAdmin.html",
            controller: 'UserAddAdminCtrl',
            pageTitle: 'Add a user',
            data: {
                groupId: 'adminUsers'
            }
        })
        .state('app.admin.editUser', {
            url: "/users/edit/:userId/{current}",
            templateUrl: "userAdmin.html",
            controller: 'UserEditAdminCtrl',
            pageTitle: 'Edit user',
            data: {
                groupId: 'adminUsers'
            },
            resolve: {
                user: ['$stateParams', 'http', function ($stateParams, http) {
                    return http.get('/rest/users/' + $stateParams.userId);
                }]
            }
        });
});