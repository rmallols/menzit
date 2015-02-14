'use strict';

app.controller('QuestionsCtrl', ['$scope', '$timeout', '$state', 'http', 'pubSub',
    function ($scope, $timeout, $state, http, pubSub) {

        var availableQuestions = [], runnedQuestions = [], failedAnswers;

        http.get('/rest/tests?categoryId=' + $state.params.categoryId).then(function (questions) {
            availableQuestions = questions;
            setScore();
            setCurrentTest();
        });

        $scope.answerCodes = ['A', 'B', 'C', 'D'];

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