'use strict';

app.controller('CategoryEditAdminCtrl', ['$scope', '$state', 'http', 'category',
    function ($scope, $state, http, category) {
        $scope.title = 'Edit category';
        $scope.category = category;
        $scope.submit = function () {
            var categoryRestUrl = '/rest/categories/' + $state.params.categoryId;
            http.put(categoryRestUrl, $scope.category).then(function () {
                $state.go('app.admin.categories');
            });
        };





    }]);