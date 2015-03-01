'use strict';

app.controller('BaseQuestionCtrl', ['$scope', 'http', function ($scope, http) {

    $scope.answerCodes = ['A', 'B', 'C', 'D'];

    $scope.getBackgroundMediaStyle = function (answer) {
        var backgroundImage = answer && answer.media && answer.media._id;
        return (backgroundImage) ? { 'background-image' : 'url(/media/' + backgroundImage + ')' } : {};
    };

    $scope.getQuestionStyleClasses = function (question) {
        return {
            'has-background-image': question && question.media && question.media._id
        };
    };

    $scope.getAnswerStyleClasses = function (answer) {
        return {
            'valid-assert': answer.validAssert,
            'invalid-assert': answer.invalidAssert,
            'has-text' : answer.title,
            'has-background-image': answer.media && answer.media._id
        };
    };

    $scope.setAnswer = function (question, answerIndex) {
        var isCorrectEndpoint = '/rest/tests/' + question._id + '/isCorrect/' + answerIndex,
            answer = question.answers[answerIndex];
        http.get(isCorrectEndpoint).then(function (response) {
            if (response.isCorrect) {
                $scope.setCorrectAnswer(answer, question._id);
            } else {
                $scope.setIncorrectAnswer(answer, question._id);
            }
        });
    };
}]);