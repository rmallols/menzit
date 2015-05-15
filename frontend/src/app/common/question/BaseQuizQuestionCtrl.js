'use strict';

app.controller('BaseQuizQuestionCtrl', ['$scope', 'http', function ($scope, http) {

    $scope.answerCodes = ['A', 'B', 'C', 'D'];

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
                $scope.setCorrectAnswer(question._id, answer);
            } else {
                $scope.setIncorrectAnswer(question._id, answer);
            }
        });
    };
}]);