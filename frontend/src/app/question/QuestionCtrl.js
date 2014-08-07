'use strict';

app.controller('QuestionCtrl', ['$scope', '$state', 'http', 'pubSub',
    function ($scope, $state, http, pubSub) {

        var availableQuestions = [], runnedQuestions = [], failedAnswers;

        http.get('/rest/tests?categoryId=' + $state.params.categoryId).then(function (questions) {
            availableQuestions = questions;
            setScore();
            setCurrentTest();
        });

        $scope.setAnswer = function (answer) {
            if (answer.isCorrect) {
                setCorrectAnswer();
            } else {
                setIncorrectAnswer(answer);
            }
        };

        $scope.getNextTest = function () {
            setCurrentTest();
            $scope.isCorrectAnswer = false;
        };

        function setCorrectAnswer() {
            $scope.isCorrectAnswer = true;
            setScore();
            if (isLastQuestion()) {
                $scope.isTestComplete = true;
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
            } while (runnedQuestions.indexOf(availableQuestions[proposedQuestionIndex]) >= 0);
            return proposedQuestionIndex;
        }

        function isLastQuestion() {
            return runnedQuestions.length === availableQuestions.length;
        }

        function setScore() {
            var maxQuestionScore = 100;
            if($scope.score === undefined) {
                $scope.score = 0;
            } else {
                $scope.score += maxQuestionScore -
                    (failedAnswers * (maxQuestionScore / ($scope.question.answers.length - 1)));
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