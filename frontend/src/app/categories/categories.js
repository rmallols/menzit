'use strict';

app.directive('categories', ['$state', 'http', function ($state, http) {
        return {
            restrict: 'A',
            replace: true,
            templateUrl: '/src/app/categories/categoriesTemDirective.html',
            link: function link(scope) {

                console.log('checking categories directive');

                http.get('/rest/categories').then(function (response) {
                    scope.categories = response;
                });

                scope.launchTest = function(category) {
                    $state.go('mz.runTest', { categoryId: category._id });
                };
            }
        };
    }]);