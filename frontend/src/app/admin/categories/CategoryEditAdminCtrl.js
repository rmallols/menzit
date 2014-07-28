'use strict';

app.controller('CategoryEditAdminCtrl', ['$scope', '$state', 'http',
    function ($scope, $state, http) {
        var categoryRestUrl = '/rest/categories/' + $state.params.categoryId;
        $scope.title = 'Edit category';
        http.get(categoryRestUrl).then(function (response) {
            $scope.category = response;
        });
        $scope.submit = function () {
            http.put(categoryRestUrl, $scope.category).then(function () {
                $state.go('mz.admin.categories');
            });
        };
    }]);