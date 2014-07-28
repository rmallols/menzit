'use strict';

app.controller('UserAddAdminCtrl', ['$scope', '$state', 'http',
    function ($scope, $state, http) {
        $scope.title = 'Add user';
        $scope.submit = function () {
            http.post('/rest/users/', $scope.user).then(function () {
                $state.go('mz.admin.users');
            });
        };
    }]);