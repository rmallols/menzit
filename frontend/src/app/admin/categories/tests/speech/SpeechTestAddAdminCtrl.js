'use strict';
app.controller('SpeechTestAddAdminCtrl', ['$scope', '$state', 'http', 'constants',
    function ($scope, $state, http, constants) {

        $scope.title = 'Add test';
        $scope.test = {
            type: constants.testTypes.speech._id,
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