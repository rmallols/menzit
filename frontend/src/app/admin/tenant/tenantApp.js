'use strict';

app.config(function ($stateProvider) {

    $stateProvider
        .state('app.admin.tenant', {
            url: "/tenant",
            templateUrl: "/src/app/admin/tenant/tenant.html",
            controller: 'TenantCtrl',
            data: {
                subGroupId: 'tenant'
            }
        });
});