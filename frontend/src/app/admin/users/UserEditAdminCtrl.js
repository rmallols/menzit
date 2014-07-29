'use strict';

app.controller('UserEditAdminCtrl', ['$scope', '$state', 'http',
    function ($scope, $state, http) {
        var userRestUrl = '/rest/users/' + $state.params.userId;
        $scope.title = 'Edit user';
        http.get(userRestUrl).then(function (response) {
            $scope.user = response;
        });
        $scope.submit = function () {
            http.put(userRestUrl, $scope.user).then(function () {
                $state.go('app.admin.users');
            });
        };
    }]);