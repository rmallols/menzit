'use strict';

app.controller('TenantAddCtrl', ['$scope', '$state', 'http', function ($scope, $state, http) {
        $scope.title = 'Add tenant';
        $scope.submit = function () {
            http.post('/rest/tenants/', $scope.tenant).then(function () {
                $state.go('app.admin.tenants');
            });
        };
    }]);