'use strict';

app.config(function ($stateProvider) {

    $stateProvider
        .state('app.admin.tenants', {
            url: "/tenants",
            templateUrl: "tenants.html",
            controller: 'TenantsCtrl',
            data: {
                groupId: 'adminTenants'
            }
        }).state('app.admin.addTenant', {
            url: "/tenants/add",
            templateUrl: "tenant.html",
            controller: 'TenantAddCtrl',
            data: {
                groupId: 'adminTenants'
            }
        }).state('app.admin.editTenant', {
            url: "/tenants/edit/:tenantId",
            templateUrl: "tenant.html",
            controller: 'TenantEditCtrl',
            resolve: {
                tenant: ['$stateParams', 'http', function ($stateParams, http) {
                    return http.get('/rest/tenants/' + $stateParams.tenantId);
                }]
            },
            data: {
                groupId: 'adminTenants'
            }
        });
});