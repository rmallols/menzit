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
                $scope.testToBeDeleted = null;
                loadTests();
            });
        };

        function loadTests() {
            var endpoint = '/rest/tests?categoryId=' + $state.params.categoryId;
            http.get(endpoint).then(function (tests) {
                $scope.tests = tests;
            });
        }
    }]);