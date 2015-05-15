'use strict';

app.controller('QuestionsQuizCtrl', ['$scope', '$controller', function ($scope, $controller) {
    $controller('BaseQuestionCtrl', {$scope: $scope});
    $controller('BaseQuizQuestionCtrl', {$scope: $scope});
    $scope.initializeTest();
}]);