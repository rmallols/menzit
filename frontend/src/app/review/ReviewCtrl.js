'use strict';

app.controller('ReviewCtrl', ['$scope', '$state', 'questions', 'constants',
    function ($scope, $state, questions, constants) {

        $scope.quizQuestions = [];
        $scope.speechQuestions = [];

        $scope.getBackgroundImageStyle = function (mediaId) {
            return {
                backgroundImage: 'url(/media/' + mediaId + ')'
            };
        };

        $scope.reviewQuizQuestion = function (questionId) {
            $state.go('app.reviewQuestion-quiz', {questionId: questionId});
        };

        $scope.reviewSpeechQuestion = function (questionId) {
            $state.go('app.reviewQuestion-speech', {questionId: questionId});
        };

        questions.forEach(function (question) {
            if (question.question && question.question.type === constants.testTypes.quiz._id) {
                $scope.quizQuestions.push(question);
            } else if (question.question && question.question.type === constants.testTypes.speech._id) {
                $scope.speechQuestions.push(question);
            }
        });
    }]);