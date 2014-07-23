'use strict';

app.controller('TenantCtrl', ['$scope', '$state', 'http', function($scope, $state, http) {

    //User info should be retrieved directly from the ui-router
    var tenantId = '53d03b280f89498cb8027384';

    http.get('/rest/tenants/' + tenantId).then(function (tenant) {
        $scope.tenant = tenant;
    });

    $scope.cancel = function() {
        $state.go('categories');
    };

    $scope.save = function() {
        var data = { name: $scope.tenant.name };
        http.put('/rest/tenants/' + tenantId, data).then(function () {
            alert('YEA, GUARDADO');
        });
    };
}]);