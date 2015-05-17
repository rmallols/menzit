'use strict';

app.controller('BaseQuestionCtrl', ['$scope', '$timeout', '$state', '$q', 'http', 'pubSub',
    function ($scope, $timeout, $state, $q, http, pubSub) {

    var availableQuestions = [], runnedQuestions = [], failedAnswers;

    $scope.initializeTest = function () {
        var deferred = $q.defer();
        http.get('/rest/tests?categoryId=' + $state.params.categoryId).then(function (questions) {
            availableQuestions = questions;
            setScore();
            setCurrentQuestion();
            deferred.resolve();
        });
        return deferred.promise;
    };

    $scope.getNextQuestion = function () {
        setCurrentQuestion();
    };

    $scope.setCorrectAnswer = function(questionId, answer) {
        if(answer) {
            answer.validAssert = true;
        }
        setScore();
        if (isLastQuestion()) {
            pubSub.publish('testFinished', { score: $scope.score });
        } else {
            $timeout(function () {
                $scope.getNextQuestion();
            }, 1000);
        }
    };

    $scope.setIncorrectAnswer = function(questionId, answer) {
        if(answer) {
            answer.invalidAssert = (answer.invalidAssert) ? false : !answer.isCorrect;
        }
        failedAnswers++;
        http.post('/rest/incorrectAnswers/' + questionId);
    };

    function setCurrentQuestion() {
        var questionId = getQuestionId();
        runnedQuestions.push(questionId);
        failedAnswers = 0;
        $scope.question = availableQuestions[questionId];
    }

    function getQuestionId() {
        var proposedQuestionIndex;
        do {
            proposedQuestionIndex = parseInt(Math.random() * availableQuestions.length);
        } while (runnedQuestions.indexOf(proposedQuestionIndex) >= 0);
        return proposedQuestionIndex;
    }

    function isLastQuestion() {
        return runnedQuestions.length === availableQuestions.length;
    }

    function setScore() {
        var maxQuestionScore = 100;
        if ($scope.score === undefined) {
            $scope.score = 0;
        } else {
            $scope.score += Math.round(maxQuestionScore / (failedAnswers + 1));
        }
        sendScoreEvent();
    }

    function sendScoreEvent() {
        pubSub.publish('scoreUpdated', {
            score: $scope.score,
            runnedQuestions: runnedQuestions.length,
            totalQuestions: availableQuestions.length
        });
    }

    $scope.getBackgroundImageStyle = function (imageId) {
        return (imageId) ? { 'background-image' : 'url(/media/' + imageId + ')' } : {};
    };
}]);