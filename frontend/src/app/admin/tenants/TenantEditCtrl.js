'use strict';

app.controller('TenantEditCtrl', ['$scope', '$state', 'http', 'tenant',
    function ($scope, $state, http, tenant) {
        $scope.title = 'Edit tenant';
        $scope.tenant = tenant;
        $scope.submit = function () {
            var tenantRestUrl = '/rest/tenants/' + $state.params.tenantId;
            http.put(tenantRestUrl, $scope.tenant).then(function () {
                $state.go('app.admin.tenants');
            });
        };
    }]);