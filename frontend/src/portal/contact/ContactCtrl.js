'use strict';

portal.controller('ContactCtrl', ['$scope', 'http', function ($scope, http) {

    $scope.submitContact = function () {
        http.post('/rest/contact', $scope.contactData).then(function () {
            $scope.success = true;
        }).catch(function () {
            $scope.error = true;
        });
    };
}]);