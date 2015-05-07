'use strict';
app.controller('SpeechTestEditAdminCtrl', ['$scope', '$state', 'http', 'test',
    function ($scope, $state, http, test) {

        $scope.title = 'Edit test';
        $scope.test = test;

        $scope.submit = function () {
            $scope.uploadImageQuestionRequestFn()
                .then($scope.uploadAudioQuestionRequestFn)
                .then(submitMetaData);
        };

        function submitMetaData() {
            http.put('/rest/tests/' + $state.params.testId, $scope.test).then(function () {
                $state.go('app.admin.tests', {categoryId: $state.params.categoryId});
            });
        }
    }]);