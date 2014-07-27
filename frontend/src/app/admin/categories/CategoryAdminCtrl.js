'use strict';

app.controller('CategoryAdminCtrl', ['$scope', '$state', 'http',
    function ($scope, $state, http) {

        setup();

        function setup() {
            if ($state.params.categoryId) {
                editSetup();
            } else {
                addSetup();
            }
        }

        function editSetup() {
            var categoryRestUrl = '/rest/categories/' + $state.params.categoryId;
            $scope.title = 'Edit category';
            http.get(categoryRestUrl).then(function (response) {
                $scope.category = response;
            });
            $scope.submit = function () {
                http.put(categoryRestUrl, $scope.category).then(function () {
                    $state.go('mz.admin.categories');
                });
            };
        }

        function addSetup() {
            $scope.title = 'Add category';
            $scope.submit = function () {
                http.post('/rest/categories/add', $scope.category).then(function () {
                    $state.go('mz.admin.categories');
                });
            };
        }
    }]);