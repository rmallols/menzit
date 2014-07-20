app.controller('TestCtrl', ['$scope', '$http', function($scope, $http) {

    $http.get('/rest/test').then(function (response) {
        $scope.test = response.data;
    });

    $scope.setAnswer = function(answer) {
        answer.invalidAssert = (answer.invalidAssert) ? false :  !answer.correct;
    }
}]);