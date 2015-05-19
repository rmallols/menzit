'use strict';

app.controller('QuizTestAddAdminCtrl', ['$scope', '$state', 'http', 'testAdmin', 'constants',
    function ($scope, $state, http, testAdmin, constants) {

        $scope.title = 'Add test';
        $scope.correctOptionIndex = 0;
        $scope.uploadAnswerRequestFns = new Array(4);
        $scope.test = {
            type: constants.testTypes.quiz._id,
            categoryId: $state.params.categoryId,
            answers: [{}, {}, {}, {}]
        };

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
            http.post('/rest/tests/', $scope.test).then(function () {
                $state.go('app.admin.tests', {categoryId: $state.params.categoryId});
            });
        }
    }]);