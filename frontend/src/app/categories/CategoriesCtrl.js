app.controller('CategoriesCtrl', ['$scope', '$state', '$http', function($scope, $state, $http) {

    $http.get('/rest/categories').then(function (response) {

        $scope.categories = response.data;
    });

    $scope.launchTest = function(category) {

        $state.go('runTest', { categoryId: category._id });
    }
}]);