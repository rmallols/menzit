'use strict';

app.controller('ReviewQuestionQuizCtrl', ['$scope', '$controller', 'question',
    function ($scope, $controller, question) {
        $scope.question = question;
        $controller('BaseReviewQuestionCtrl', {$scope: $scope});
        $controller('BaseQuizQuestionCtrl', { $scope: $scope });
    }]);