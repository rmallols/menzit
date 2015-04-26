'use strict';

app.controller('TestEditAdminCtrl', ['$scope', '$state', 'http', 'test', 'testAdmin',
    function ($scope, $state, http, test, testAdmin) {

        $scope.title = 'Edit test';
        $scope.test = test;
        $scope.test.answers = testAdmin.getNormalizedInputAnswers($scope.test.answers);
        $scope.uploadAnswerRequestFns = new Array(4);
        angular.forEach($scope.test.answers, function (answer, $index) {
            if (answer.isCorrect) {
                $scope.correctOptionIndex = $index;
            }
        });

        $scope.submit = function () {
            $scope.uploadImageQuestionRequestFn().then(function () {
                $scope.uploadAudioQuestionRequestFn().then(function () {
                    angular.forEach($scope.uploadAnswerRequestFns, function (uploadAnswerRequestFn, $index) {
                        uploadAnswerRequestFn().then(function () {
                            if ($index === $scope.uploadAnswerRequestFns.length - 1) {
                                setupData();
                                submitMetaData();
                            }
                        });
                    });
                });
            });
        };

        function setupData() {
            $scope.test.answers = testAdmin.getNormalizedOutputAnswers($scope.test.answers);
            angular.forEach($scope.test.answers, function (answer, $index) {
                answer.isCorrect = $index === Number($scope.correctOptionIndex);
            });
        }

        function submitMetaData() {
            http.put('/rest/tests/' + $state.params.testId, $scope.test).then(function () {
                $state.go('app.admin.tests', {categoryId: $state.params.categoryId});
            });
        }
    }]);