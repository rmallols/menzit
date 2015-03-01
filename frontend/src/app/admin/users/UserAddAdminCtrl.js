'use strict';

app.controller('UserAddAdminCtrl', ['$scope', '$state', 'http', 'constants',
    function ($scope, $state, http, constants) {

        $scope.title = 'Add user';
        $scope.roles = constants.roles;
        $scope.user = {
            role: $scope.roles[0]._id
        };

        $scope.submit = function () {
            $scope.uploadRequestFn().then(function () {
                http.post('/rest/users/', $scope.user).then(function () {
                    $state.go('app.admin.users');
                });
            });
        };
    }]);