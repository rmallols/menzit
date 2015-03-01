'use strict';

app.controller('CategoriesAdminCtrl', ['$scope', '$state', 'http',
    function ($scope, $state, http) {

        loadCategories();

        $scope.add = function () {
            $state.go('app.admin.addCategory');
        };

        $scope.edit = function (category) {
            $state.go('app.admin.editCategory', { categoryId: category._id });
        };

        $scope.viewTests = function (category) {
            $state.go('app.admin.tests', { categoryId: category._id });
        };

        $scope.confirmDelete = function (category) {
            $scope.categoryToBeDeleted = category;
        };

        $scope.delete = function () {
            http.delete('/rest/categories/' + $scope.categoryToBeDeleted._id).then(function () {
                var mediaId = $scope.categoryToBeDeleted.media && $scope.categoryToBeDeleted.media._id;
                $scope.categoryToBeDeleted = null;
                loadCategories();
                if(mediaId) {
                    http.delete('/rest/media/' + mediaId);
                }
            });
        };

        function loadCategories() {
            http.get('/rest/categories').then(function (response) {
                $scope.categories = response;
            });
        }
    }]);