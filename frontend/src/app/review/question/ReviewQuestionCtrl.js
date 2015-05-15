'use strict';

app.controller('ReviewQuestionCtrl', ['$scope', '$controller', '$timeout', '$state', '$q', 'http', 'question',
function ($scope, $controller, $timeout, $state, $q, http, question) {

    $controller('BaseQuestionCtrl', { $scope: $scope });
    $controller('BaseQuizQuestionCtrl', { $scope: $scope });

    setCurrentQuestion(question);

    $scope.setCorrectAnswer = function(questionId, answer) {
        answer.validAssert = true;
        http.post('/rest/incorrectAnswers/' + questionId + '/addCorrect').then(manageNextQuestion);
    };

    $scope.setIncorrectAnswer = function(questionId, answer) {
        answer.invalidAssert = (answer.invalidAssert) ? false : !answer.isCorrect;
        http.post('/rest/incorrectAnswers/' + questionId);
    };

    function setCurrentQuestion(question) {
        $scope.question = question;
    }

    function manageNextQuestion() {
        getNextQuestion().then(function (nextQuestion) {
            $timeout(function () {
                if(nextQuestion) {
                    setCurrentQuestion(nextQuestion);
                } else {
                    $state.go('app.review');
                }
            }, 1000);
        });
    }

    function getNextQuestion() {
        var deferred = $q.defer();
        http.get('/rest/incorrectAnswers/first').then(function (incorrectAnswer) {
            deferred.resolve(incorrectAnswer.question);
        });
        return deferred.promise;
    }
}]);