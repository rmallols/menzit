(function () {
    'use strict';
    app.directive('menu', ['$rootScope', '$state', 'session', 'pubSub', 'constants',
        function ($rootScope, $state, session, pubSub, constants) {
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
                        var userName = scope.credentials.userName,
                            password = scope.credentials.password,
                            remember = scope.credentials.remember;
                        session.login(userName, password, remember).then(function (session) {
                            if (session) {
                                $rootScope.$emit('authenticatedUser', session);
                                scope.session = session;
                                scope.showLogin = false;
                            } else {
                                window.alert('Incorrect login');
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

                    scope.getTenantLogo = function () {
                        return (scope.session && session.tenant.image) || constants.logoPath;
                    };

                    pubSub.subscribe('logout', function () {
                        scope.session = null;
                        scope.$apply();
                    });
                }
            };
        }]);
})();