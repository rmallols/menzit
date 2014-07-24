'use strict';

app.controller('TenantCtrl', ['$rootScope', '$scope', '$state', 'http', 'session',
    function ($rootScope, $scope, $state, http, session) {

        console.log('session, nunca deberia llegarse con un valor vacio a este punto', session);

        setupTenant(session);

        $rootScope.$on('authenticatedUser', function (e, session) {
            setupTenant(session);
        });

        $scope.cancel = function () {
            $state.go('mz.categories');
        };

        $scope.save = function () {
            var data = { name: $scope.tenant.name };
            http.put('/rest/tenants/' + session.tenantId, data).then(function () {
                alert('YEA, GUARDADO');
            });
        };

        function setupTenant(session) {
            http.get('/rest/tenants/' + session.tenantId).then(function (tenant) {
                $scope.tenant = tenant;
            });
        }
    }]);