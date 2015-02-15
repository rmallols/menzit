'use strict';

app.controller('BaseQuestionCtrl', ['$scope', 'http', function ($scope, http) {

    $scope.answerCodes = ['A', 'B', 'C', 'D'];

    $scope.getBackgroundImageStyle = function (answer) {
        var backgroundImage = answer && (answer.imageUrl || answer.image);
        return (backgroundImage) ? { 'background-image' : 'url(' + backgroundImage + ')' } : {};
    };

    $scope.getQuestionStyleClasses = function (question) {
        return {
            'has-background-image': question && (question.imageUrl || question.image)
        };
    };

    $scope.getAnswerStyleClasses = function (answer) {
        return {
            'valid-assert': answer.validAssert,
            'invalid-assert': answer.invalidAssert,
            'has-text' : answer.title,
            'has-background-image': answer.image || answer.imageUrl
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