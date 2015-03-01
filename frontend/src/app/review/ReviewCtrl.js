'use strict';

app.controller('ReviewCtrl', ['$scope', '$state', 'questions', function ($scope, $state, questions) {

    $scope.questions = questions;

    $scope.getBackgroundImageStyle = function (answer) {
        return {
            backgroundImage: 'url(' + (answer.media && answer.media._id) + ')'
        };
    };

    $scope.reviewQuestion = function(questionId) {
        $state.go('app.reviewQuestion', { questionId: questionId });
    };
}]);