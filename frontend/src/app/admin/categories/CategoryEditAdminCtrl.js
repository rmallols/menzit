'use strict';

app.controller('CategoryEditAdminCtrl', ['$scope', '$state', 'http', 'category',
    function ($scope, $state, http, category) {
        var categoryRestUrl = '/rest/categories/' + $state.params.categoryId;
        $scope.title = 'Edit category';
        $scope.category = category;
        $scope.submit = function () {
            http.put(categoryRestUrl, $scope.category).then(function () {
                $state.go('app.admin.categories');
            });
        };
    }]);