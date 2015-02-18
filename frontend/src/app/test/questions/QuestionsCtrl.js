'use strict';

app.controller('QuestionsCtrl', ['$scope', '$controller', '$timeout', '$state', 'http', 'pubSub',
    function ($scope, $controller, $timeout, $state, http, pubSub) {

        var availableQuestions = [], runnedQuestions = [], failedAnswers;

        $controller('BaseQuestionCtrl', { $scope: $scope });

        http.get('/rest/tests?categoryId=' + $state.params.categoryId).then(function (questions) {
            availableQuestions = questions;
            setScore();
            setCurrentQuestion();
        });

        $scope.getNextQuestion = function () {
            setCurrentQuestion();
            $scope.isCorrectAnswer = false;
        };

        $scope.setCorrectAnswer = function(answer) {
            $scope.isCorrectAnswer = true;
            answer.validAssert = true;
            setScore();
            if (isLastQuestion()) {
                pubSub.publish('testFinished', { score: $scope.score });
            } else {
                $timeout(function () {
                    $scope.getNextQuestion();
                }, 1000);
            }
        };

        $scope.setIncorrectAnswer = function(answer, questionId) {
            answer.invalidAssert = (answer.invalidAssert) ? false : !answer.isCorrect;
            if (failedAnswers < $scope.question.answers.length - 1) {
                failedAnswers++;
            }
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
                $scope.score += maxQuestionScore -
                (failedAnswers * Math.ceil(maxQuestionScore / ($scope.question.answers.length)));
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
    }]);