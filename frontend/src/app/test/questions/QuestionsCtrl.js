'use strict';

app.controller('QuestionsCtrl', ['$scope', '$timeout', '$state', 'http', 'pubSub',
    function ($scope, $timeout, $state, http, pubSub) {

        var availableQuestions = [], runnedQuestions = [], failedAnswers;

        http.get('/rest/tests?categoryId=' + $state.params.categoryId).then(function (questions) {
            availableQuestions = questions;
            setScore();
            setCurrentTest();
        });

        $scope.setAnswer = function (answer) {
            if (answer.isCorrect) {
                setCorrectAnswer(answer);
            } else {
                setIncorrectAnswer(answer);
            }
        };

        $scope.getNextTest = function () {
            setCurrentTest();
            $scope.isCorrectAnswer = false;
        };

        $scope.getLayoutStyleClass = function() {
            var columns = ($scope.question.answers.length === 4) ?
                            2 :
                            $scope.question.answers.length;
            return 'l-1-' + columns;
        };

        function setCorrectAnswer(answer) {
            $scope.isCorrectAnswer = true;
            answer.validAssert = true;
            setScore();
            if (isLastQuestion()) {
                $scope.isTestComplete = true;
            } else {
                $timeout(function () {
                    $scope.getNextTest();
                }, 1000);
            }
        }

        function setIncorrectAnswer(answer) {
            answer.invalidAssert = (answer.invalidAssert) ? false : !answer.isCorrect;
            if (failedAnswers < $scope.question.answers.length - 1) {
                failedAnswers++;
            }
        }

        function setCurrentTest() {
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