(function () {
    'use strict';
    app.directive('menu', ['$rootScope', '$state', 'session', 'pubSub',
        function ($rootScope, $state, session, pubSub) {
            return  {
                replace: true,
                restrict: 'A',
                templateUrl: 'menu.html',
                link: function link(scope) {

                    session.getSession().then(function (session) {
                        scope.session = session;
                    });

                    scope.hasAdminRole = function () {
                        return session.hasAdminRole();
                    };

                    scope.showAdminOptions = function () {
                        $state.go('app.admin.tenants');
                    };

                    scope.showLoginDialog = function () {
                        scope.credentials = {};
                        scope.showLogin = true;
                    };

                    scope.login = function () {
                        var userName = scope.credentials.userName;
                        var password = scope.credentials.password;
                        session.login(userName, password).then(function (session) {
                            if (session) {
                                $rootScope.$emit('authenticatedUser', session);
                                scope.session = session;
                                scope.showLogin = false;
                            } else {
                                window.alert('LOGIN INCORRECTO');
                            }
                        });
                    };

                    scope.isActiveAction = function () {
                        var stateData = $state.current.data;
                        return { active: stateData && stateData.groupId === 'admin' };
                    };

                    scope.toggleActiveMenuPanel = function () {
                        scope.isPanelActive = (scope.isPanelActive !== true);
                    };

                    pubSub.subscribe('logout', function () {
                        scope.session = null;
                    });
                }
            };
        }]);
})();