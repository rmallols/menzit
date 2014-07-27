'use strict';

app.controller('CategoriesAdminCtrl', ['$scope', '$state', 'http',
    function ($scope, $state, http) {

        http.get('/rest/categories').then(function (response) {
            $scope.categories = response;
        });

        $scope.edit = function (category) {
            $state.go('mz.admin.category', { categoryId: category._id });
        };

        $scope.confirmDelete = function (category) {
            $scope.categoryToBeDeleted = category;
        };

        $scope.delete = function (category) {
            console.log('VA A SER ELIMINADO', category);
        };
    }]);