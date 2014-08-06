'use strict';

app.controller('QuestionCtrl', ['$scope', '$state', 'http', 'pubSub',
    function ($scope, $state, http, pubSub) {

        var availableQuestions = [], runnedQuestions = [], failedAnswers;

        $scope.score = 0;

        http.get('/rest/tests?categoryId=' + $state.params.categoryId).then(function (questions) {
            availableQuestions = questions;
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
            updateScore();
            if (isLastQuestion()) {
                $scope.isTestComplete = true;
            }
            pubSub.publish('scoreUpdated', { foo: 'bar'});
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

        function updateScore() {
            var maxQuestionScore = 100;
            $scope.score += maxQuestionScore -
                (failedAnswers * (maxQuestionScore / ($scope.question.answers.length - 1)));
        }
    }]);