'use strict';

app.controller('ReviewQuestionCtrl', ['$scope', '$controller', 'question',
    function ($scope, $controller, question) {

        $scope.question = question;
        $controller('BaseReviewQuestionCtrl', {$scope: $scope});
    }]);