'use strict';

app.controller('TestsAdminCtrl', ['$scope', '$state', 'category',
    function ($scope, $state, category) {
        $scope.category = category;
        $scope.add = function () {
            $state.go('app.admin.addTest', { categoryId: $state.params.categoryId });
        };
    }]);