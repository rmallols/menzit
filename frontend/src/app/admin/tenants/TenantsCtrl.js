'use strict';

app.controller('TenantsCtrl', ['$rootScope', '$scope', '$state', 'http',
    function ($rootScope, $scope, $state, http) {

        loadTenants();

        $scope.add = function () {
            $state.go('app.admin.addTenant');
        };

        $scope.invite = function (tenant) {
            $state.go('app.admin.inviteToTenant', { tenantId: tenant._id });
        };

        $scope.edit = function (tenant) {
            $state.go('app.admin.editTenant', { tenantId: tenant._id });
        };

        $scope.confirmDelete = function (tenant) {
            $scope.tenantToBeDeleted = tenant;
        };

        $scope.delete = function () {
            http.delete('/rest/tenants/' + $scope.tenantToBeDeleted._id).then(function () {
                var mediaId =  $scope.tenantToBeDeleted.media && $scope.tenantToBeDeleted.media._id;
                $scope.tenantToBeDeleted = null;
                loadTenants();
                if(mediaId) {
                    http.delete('/rest/media/' + mediaId);
                }
            });
        };

        function loadTenants() {
            http.get('/rest/tenants').then(function (response) {
                $scope.tenants = response;
            });
        }
    }]);