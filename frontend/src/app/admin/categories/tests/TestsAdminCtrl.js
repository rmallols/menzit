'use strict';

app.controller('TestsAdminCtrl', ['$scope', '$state', 'http', 'category',
    function ($scope, $state, http, category) {

        loadTests();

        $scope.category = category;

        $scope.add = function () {
            $state.go('app.admin.addTest', { categoryId: $state.params.categoryId });
        };

        $scope.edit = function (test) {
            $state.go('app.admin.editTest', {
                testId: test._id,
                categoryId: $state.params.categoryId
            });
        };

        $scope.confirmDelete = function (test) {
            $scope.testToBeDeleted = test;
        };

        $scope.delete = function () {
            http.delete('/rest/tests/' + $scope.testToBeDeleted._id).then(function () {
                loadTests();
                deleteMedia();
                $scope.testToBeDeleted = null;
            });
        };

        function loadTests() {
            var endpoint = '/rest/tests?categoryId=' + $state.params.categoryId;
            http.get(endpoint).then(function (tests) {
                $scope.tests = tests;
            });
        }

        function deleteMedia() {
            var mediaId =   $scope.testToBeDeleted.question.media &&
                            $scope.testToBeDeleted.question.media._id;
            submitDeleteMedia(mediaId);
            angular.forEach($scope.testToBeDeleted.answers, function (answer) {
                mediaId = answer.media && answer.media._id;
                submitDeleteMedia(mediaId);
            });
        }

        function submitDeleteMedia(mediaId) {
            if(mediaId) {
                http.delete('/rest/media/' + mediaId);
            }
        }
    }]);