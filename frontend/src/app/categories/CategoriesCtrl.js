'use strict';

app.controller('CategoriesCtrl', ['$scope', '$state', 'http', function($scope, $state, http) {

    http.get('/rest/categories').then(function (response) {
        $scope.categories = response;
    });

    $scope.launchTest = function (category) {
        $state.go('app.test', { categoryId: category._id });
    };

    $scope.getBackgroundImageStyle = function (category) {
        var backgroundImage = category.imageUrl || category.image;
        return (backgroundImage) ? { 'background-image' : 'url(' + backgroundImage + ')' } : {};
    };
}]);