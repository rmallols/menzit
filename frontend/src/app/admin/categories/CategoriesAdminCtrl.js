'use strict';

app.controller('CategoriesAdminCtrl', ['$scope', '$state', 'http',
    function ($scope, $state, http) {

        loadCategories();

        $scope.add = function () {
            $state.go('mz.admin.addCategory');
        };

        $scope.edit = function (category) {
            $state.go('mz.admin.editCategory', { categoryId: category._id });
        };

        $scope.confirmDelete = function (category) {
            $scope.categoryToBeDeleted = category;
        };

        $scope.delete = function () {
            http.delete('/rest/categories/' + $scope.categoryToBeDeleted._id).then(function () {
                $scope.categoryToBeDeleted = null;
                loadCategories();
            });
        };

        function loadCategories() {
            http.get('/rest/categories').then(function (response) {
                $scope.categories = response;
            });
        }
    }]);