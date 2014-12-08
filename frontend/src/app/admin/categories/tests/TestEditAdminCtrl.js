'use strict';

app.controller('TestEditAdminCtrl', ['$scope', '$state', 'http', 'test', 'testAdmin',
    function ($scope, $state, http, test, testAdmin) {

        $scope.title = 'Edit test';
        $scope.test = test;
        $scope.test.answers = testAdmin.getNormalizedInputAnswers($scope.test.answers);
        angular.forEach($scope.test.answers, function(answer, $index) {
            if(answer.isCorrect) {
                $scope.correctOptionIndex = $index;
            }
        });

        $scope.submit = function () {
            var testRestUrl = '/rest/tests/' + $state.params.testId;
            $scope.test.answers = testAdmin.getNormalizedOutputAnswers($scope.test.answers);
            angular.forEach($scope.test.answers, function(answer, $index) {
                answer.isCorrect = $index === Number($scope.correctOptionIndex);
            });
            http.put(testRestUrl, $scope.test).then(function () {
                $state.go('app.admin.tests', { categoryId: $state.params.categoryId });
            });
        };
    }]);