'use strict';

app.controller('TestEditAdminCtrl', ['$scope', '$state', 'http', 'test',
    function ($scope, $state, http, test) {
        $scope.title = 'Edit test';
        $scope.test = test;
        angular.forEach($scope.test.answers, function(answer, $index) {
            if(answer.isCorrect) {
                $scope.correctOptionIndex = $index;
            }
        });

        $scope.submit = function () {
            var testRestUrl = '/rest/tests/' + $state.params.testId;
            angular.forEach($scope.test.answers, function(answer, $index) {
                answer.isCorrect = $index === Number($scope.correctOptionIndex);
            });
            http.put(testRestUrl, $scope.test).then(function () {
                $state.go('app.admin.tests', { categoryId: $state.params.categoryId });
            });
        };
    }]);