'use strict';

app.controller('CategoryAddAdminCtrl', ['$scope', '$state', 'http', 'constants',
    function ($scope, $state, http, constants) {
        $scope.title = 'Add category';
        $scope.types = [];
        angular.forEach(constants.testTypes, function (testType) {
            $scope.types.push(testType);
        });
        $scope.category = {
            type: $scope.types[0]._id,
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