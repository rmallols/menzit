(function() {
    'use strict';
    app.directive('menu',['$rootScope', '$state', 'session',
    function ($rootScope, $state, session) {
        return  {
            replace: true,
            restrict: 'A',
            templateUrl: '/src/app/menu/menu.html',
            link: function link(scope) {

                session.getSession().then(function (session) {
                    scope.session = session;
                });

                scope.showAdminOptions = function() {
                    $state.go('mz.admin.tenant');
                };

                scope.showLoginDialog = function() {
                    scope.credentials = {};
                    scope.showLogin = true;
                };

                scope.login = function() {
                    var userName = scope.credentials.userName;
                    var password = scope.credentials.password;
                    session.login(userName, password).then(function(session) {
                        if(session) {
                            $rootScope.$emit('authenticatedUser', session);
                            scope.session = session;
                            scope.showLogin = false;
                        } else {
                            alert('LOGIN INCORRECTO');
                        }
                    });
                };

                scope.logout = function() {
                    session.logout().then(function () {
                        scope.session = undefined;
                    });
                };

                scope.isActiveAction = function () {
                    return { active: $state.current.data.groupId === 'admin' };
                };
            }
        };
    }]);
})();