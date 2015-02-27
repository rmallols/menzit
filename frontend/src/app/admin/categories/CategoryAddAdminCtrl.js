'use strict';

app.controller('CategoryAddAdminCtrl', ['$scope', '$state', 'http',
    function ($scope, $state, http) {
        $scope.title = 'Add category';
        $scope.category = {
            tests: []
        };
        $scope.submit = function () {
            $scope.uploadRequestFn().then(function () {
                http.post('/rest/categories/', $scope.category).then(function () {
                    $state.go('app.admin.categories');
                });
            });
        };
    }]);