'use strict';

app.controller('UserActivateAdminCtrl', ['$scope', '$state', 'http', 'user',
    function ($scope, $state, http, user) {

        $scope.title = 'Welcome to menzit!';
        $scope.description = 'Please fill the following information in order to activate your account';
        $scope.user = user;
        $scope.hideAdminOptions = true;

        $scope.submit = function () {
            $scope.uploadRequestFn().then(function () {
                http.put('/rest/users/' + $state.params.userId, $scope.user).then(function () {
                    $state.go('app.categories');
                });
            });
        };
    }]);