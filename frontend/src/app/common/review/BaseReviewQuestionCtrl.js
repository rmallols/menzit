'use strict';

app.controller('BaseReviewQuestionCtrl', ['$scope', '$controller', '$timeout', '$state', '$q', 'http',
function ($scope, $controller, $timeout, $state, $q, http) {

    $controller('BaseQuestionCtrl', { $scope: $scope });

    setCurrentQuestion($scope.question);

    $scope.setCorrectAnswer = function(questionId, answer) {
        if(answer) {
            answer.validAssert = true;
        }
        http.post('/rest/incorrectAnswers/' + questionId + '/addCorrect').then(manageNextQuestion);
    };

    $scope.setIncorrectAnswer = function(questionId, answer) {
        if(answer) {
            answer.invalidAssert = (answer.invalidAssert) ? false : !answer.isCorrect;
        }
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