'use strict';

app.controller('CategoryAddAdminCtrl', ['$scope', '$state', 'http',
    function ($scope, $state, http) {
        $scope.title = 'Add category';
        $scope.submit = function () {
            http.post('/rest/categories/', $scope.category).then(function () {
                $state.go('mz.admin.categories');
            });
        };
    }]);