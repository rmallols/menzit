'use strict';

app.directive('categories', ['$state', 'http', function ($state, http) {
    return {
        restrict: 'A',
        replace: true,
        templateUrl: '/src/app/categories/categoriesDirective.html',
        link: function link(scope) {

            http.get('/rest/categories').then(function (response) {
                scope.categories = response;
            });

            scope.launchTest = function (category) {
                $state.go('mz.runTest', { categoryId: category._id });
            };

            scope.confirmDelete = function (category) {
                scope.categoryToBeDeleted = category;
            };

            scope.delete = function (category) {
                  console.log('VA A SER ELIMINADO', category);
            };
        }
    };
}]);