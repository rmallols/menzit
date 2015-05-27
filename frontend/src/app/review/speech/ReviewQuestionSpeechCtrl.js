'use strict';

app.controller('ReviewQuestionSpeechCtrl', ['$scope', '$controller', 'question',
    function ($scope, $controller, question) {
        $scope.question = question;
        $controller('BaseReviewQuestionCtrl', {$scope: $scope});
        $controller('BaseSpeechQuestionCtrl', {$scope: $scope});
    }]);