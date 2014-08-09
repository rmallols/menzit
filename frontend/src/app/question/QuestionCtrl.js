'use strict';

app.controller('QuestionCtrl', ['$scope', '$timeout', '$state', 'http', 'pubSub',
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

        function setCorrectAnswer(answer) {
            $scope.isCorrectAnswer = true;
            answer.validAssert = true;
            setScore();
            if (isLastQuestion()) {
                $scope.isTestComplete = true;
            } else {
                $timeout(function() {
                    console.log('trying to get next');
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
            console.log('current is, NUNCA IGUAL QUE EL ANTERIOR!!!', questionId, $scope.question);
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