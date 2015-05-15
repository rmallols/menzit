'use strict';

app.controller('TestQuizCtrl', ['$scope', '$controller', function ($scope, $controller) {
    $controller('BaseTestCtrl', { $scope: $scope });
}]);