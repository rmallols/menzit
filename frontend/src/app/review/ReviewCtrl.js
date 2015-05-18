'use strict';

app.controller('ReviewCtrl', ['$scope', '$state', 'questions', 'constants',
    function ($scope, $state, questions, constants) {

    $scope.quizQuestions = [];
    $scope.speechQuestions = [];

    $scope.getBackgroundImageStyle = function (answer) {
        return {
            backgroundImage: 'url(' + (answer.media && answer.media._id) + ')'
        };
    };

    $scope.reviewQuestion = function(questionId) {
        $state.go('app.reviewQuestion', { questionId: questionId });
    };

    questions.forEach( function (question) {
        if(question.question && question.question.type === constants.testTypes.quiz._id) {
            $scope.quizQuestions.push(question);
        } else if(question.question && question.question.type === constants.testTypes.speech._id) {
            $scope.speechQuestions.push(question);
        }
    });
}]);