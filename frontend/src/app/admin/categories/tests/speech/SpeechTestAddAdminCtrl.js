'use strict';
app.controller('SpeechTestAddAdminCtrl', ['$scope', '$state', 'http',
    function ($scope, $state, http) {

        $scope.title = 'Add test';
        $scope.test = {
            categoryId: $state.params.categoryId
        };

        $scope.submit = function () {
            $scope.uploadImageQuestionRequestFn()
                .then($scope.uploadAudioQuestionRequestFn)
                .then(submitMetaData);
        };

        function submitMetaData() {
            http.post('/rest/tests/', $scope.test).then(function () {
                $state.go('app.admin.tests', {categoryId: $state.params.categoryId});
            });
        }
    }]);