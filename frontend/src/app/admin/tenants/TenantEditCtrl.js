'use strict';

app.controller('TenantEditCtrl', ['$scope', '$state', '$q', 'http', 'tenant',
    function ($scope, $state, $q, http, tenant) {
        $scope.title = 'Edit tenant';
        $scope.tenant = tenant;
        $scope.submit = function () {
            var tenantRestUrl = '/rest/tenants/' + $state.params.tenantId;
            $scope.uploadRequestFn().then(function () {
                http.put(tenantRestUrl, $scope.tenant).then(function () {
                    $state.go('app.admin.tenants');
                });
            });
        };
    }]);