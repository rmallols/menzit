'use strict';

app.controller('CategoryEditAdminCtrl', ['$scope', '$state', 'http', 'category', 'constants',
    function ($scope, $state, http, category, constants) {
        $scope.title = 'Edit category';
        $scope.category = category;
        $scope.types = constants.testTypes;
        $scope.submit = function () {
            $scope.uploadRequestFn().then(function () {
                var categoryRestUrl = '/rest/categories/' + $state.params.categoryId;
                http.put(categoryRestUrl, $scope.category).then(function () {
                    $state.go('app.admin.categories');
                });
            });
        };
    }]);