'use strict';

app.controller('UserEditAdminCtrl', ['$scope', '$state', 'http', 'user',
    function ($scope, $state, http, user) {
        $scope.title = 'Edit user';
        $scope.user = user;
        $scope.showForceChangePasswordLink = true;

        $scope.submit = function () {
            http.put('/rest/users/' + $state.params.userId, $scope.user).then(function () {
                $state.go('app.admin.users');
            });
        };

        $scope.forceChangePassword = function () {
            $scope.showForceChangePasswordLink = false;
        };
    }]);