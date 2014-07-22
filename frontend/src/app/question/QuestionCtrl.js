'use strict';

app.controller('QuestionCtrl', ['$scope', '$state', 'http', function($scope, $state, http) {

    var runnedQuestions = [];

    http.get('/rest/categories/' + $state.params.categoryId).then(function (response) {
        var questionId = getQuestionId(response.questions);
        runnedQuestions.push(questionId);
        http.get('/rest/questions/' + questionId).then(function (response) {
            $scope.question = response;
        });
    });

    $scope.setAnswer = function(answer) {
        answer.invalidAssert = (answer.invalidAssert) ? false :  !answer.correct;
    };

    function getQuestionId(questions) {
        var proposedQuestionIndex;
        do {
            proposedQuestionIndex = parseInt(Math.random() * questions.length);
        } while(runnedQuestions.indexOf(questions[proposedQuestionIndex]) >= 0);
        return questions[proposedQuestionIndex];
    }
}]);