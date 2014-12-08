'use strict';

app.controller('TestAddAdminCtrl', ['$scope', '$state', 'http', 'testAdmin',
    function ($scope, $state, http, testAdmin) {
        console.log('ALL THE TEST STUFF SHOULD BE RENAMED TO QUESTION')

        $scope.title = 'Add test';
        $scope.correctOptionIndex = 0;
        $scope.test = {
            categoryId: $state.params.categoryId,
            answers: [{}, {}, {}, {}]
        };

        $scope.submit = function () {
            $scope.test.answers = testAdmin.getNormalizedOutputAnswers($scope.test.answers);
            angular.forEach($scope.test.answers, function(answer, $index) {
                answer.isCorrect = $index === Number($scope.correctOptionIndex);
            });
            http.post('/rest/tests/', $scope.test).then(function () {
                $state.go('app.admin.tests', { categoryId: $state.params.categoryId });
            });
        };
    }]);