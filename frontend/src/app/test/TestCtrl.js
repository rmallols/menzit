app.controller('TestCtrl', ['$scope', function($scope) {

    $scope.test = {
        question: 'Which is the most suitable way to define single line input texts?',
        answers: [{
                title: '<input type="text" />',
                correct: true
            },{
                title: '<textarea></textarea>',
                explanation: 'adsas dkas dkasdkas',
                correct: false
            },{
                title: '<input type="radio" />',
                explanation: '333 adsas dkas dkasdkas',
                correct: false
            }
        ]
    }

    $scope.setAnswer = function(answer) {
        answer.invalidAssert = (answer.invalidAssert) ? false :  !answer.correct;
    }
}]);