app.controller('TestCtrl', ['$scope', '$state', '$http', function($scope, $state, $http) {


    console.log('AAA', $state.params.categoryId);

    $http.get('/rest/questions').then(function (response) {

        $scope.test = response.data;
    });

    $scope.setAnswer = function(answer) {

        answer.invalidAssert = (answer.invalidAssert) ? false :  !answer.correct;
    }
}]);