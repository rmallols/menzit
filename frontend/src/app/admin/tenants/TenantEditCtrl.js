'use strict';

app.controller('TenantEditCtrl', ['$scope', '$state', '$q', 'http', 'tenant',
    function ($scope, $state, $q, http, tenant) {
        $scope.title = 'Edit tenant';
        $scope.tenant = tenant;
        $scope.submit = function () {
            var tenantRestUrl = '/rest/tenants/' + $state.params.tenantId;
            http.put(tenantRestUrl, $scope.tenant).then(function () {
                $state.go('app.admin.tenants');
            });
        };

        $scope.tags = [{"text":"Tag1"},{"text":"Tag3"}];


console.log('out')

        $scope.loadCategories = function () {
            var deferred = $q.defer();
            deferred.resolve(['Tag1', 'Tag2', 'Tag3', 'Tag4', 'Tag5']);
            return deferred.promise;
        };
    }]);