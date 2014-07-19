app.controller('TestCtrl', ['$scope', function($scope) {

    $scope.test = {
        question: 'Which is the most suitable way to define single line input texts?',
        answers: [{
                title: '<input type="text" />',
                correct: true
            },{
                title: '<textarea></textarea>',
                correct: false
            },{
                title: '<input type="radio" />',
                correct: false
            },
        ]
    }

    $scope.setAnswer = function(answer) {
        alert(answer.correct);
    }
}]);