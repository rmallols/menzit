'use strict';

app.controller('QuestionsSpeechCtrl', ['$scope', '$controller', function ($scope, $controller) {
    $controller('BaseQuestionCtrl', {$scope: $scope});
    $controller('BaseSpeechQuestionCtrl', {$scope: $scope});
    $scope.initializeTest();
}]);