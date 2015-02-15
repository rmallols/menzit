'use strict';

app.controller('ReviewCtrl', ['$scope', '$state', 'questions', function ($scope, $state, incorrectAnswers) {

    $scope.incorrectAnswers = incorrectAnswers;

    $scope.getBackgroundImageStyle = function (answer) {
        return {
            backgroundImage: 'url(' + (answer.imageUrl || answer.image) + ')'
        };
    };

    $scope.reviewQuestion = function(questionId) {
        $state.go('app.reviewQuestion', { questionId: questionId });
    };
}]);