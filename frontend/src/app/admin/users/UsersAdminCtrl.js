'use strict';

app.controller('UsersAdminCtrl', ['$scope', '$state', 'http',
    function ($scope, $state, http) {

    loadUsers();

    $scope.add = function () {
        $state.go('app.admin.addUser');
    };

    $scope.edit = function (user) {
        $state.go('app.admin.editUser', { userId: user._id });
    };

    $scope.confirmDelete = function (user) {
        $scope.userToBeDeleted = user;
    };

    $scope.delete = function () {
        http.delete('/rest/users/' + $scope.userToBeDeleted._id).then(function () {
            $scope.userToBeDeleted = null;
            loadUsers();
        });
    };

    function loadUsers() {
        http.get('/rest/users').then(function (response) {
            $scope.users = response;
        });
    }
}]);