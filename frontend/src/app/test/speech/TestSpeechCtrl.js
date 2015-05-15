'use strict';

app.controller('TestSpeechCtrl', ['$scope', '$controller', function ($scope, $controller) {
    $controller('BaseTestCtrl', { $scope: $scope });
}]);