'use strict';

app.controller('TestsAdminCtrl', ['$scope', '$state', 'http', 'category',
    function ($scope, $state, http, category) {

        loadTests();

        $scope.category = category;

        $scope.add = function () {
            $state.go('app.admin.add-' + $scope.category.type + 'Test', { categoryId: $state.params.categoryId });
        };

        $scope.edit = function (test) {
            $state.go('app.admin.edit-' + $scope.category.type + 'Test', {
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
                deleteImages();
                deleteAudios();
                $scope.testToBeDeleted = null;
            });
        };

        function loadTests() {
            var endpoint = '/rest/tests?categoryId=' + $state.params.categoryId;
            http.get(endpoint).then(function (tests) {
                $scope.tests = tests;
            });
        }

        function deleteImages() {
            var imageId =   $scope.testToBeDeleted.question.media &&
                            $scope.testToBeDeleted.question.media._id;
            submitDeleteMedia(imageId);
            angular.forEach($scope.testToBeDeleted.answers, function (answer) {
                imageId = answer.media && answer.media._id;
                submitDeleteMedia(imageId);
            });
        }

        function deleteAudios() {
            var audioId =   $scope.testToBeDeleted.question.audio &&
                            $scope.testToBeDeleted.question.audio._id;
            submitDeleteMedia(audioId);
            angular.forEach($scope.testToBeDeleted.answers, function (answer) {
                audioId = answer.audioId && answer.audioId._id;
                submitDeleteMedia(audioId);
            });
        }

        function submitDeleteMedia(mediaId) {
            if(mediaId) {
                http.delete('/rest/media/' + mediaId);
            }
        }
    }]);