(function () {
    'use strict';
    app.directive('menu', ['$state', 'session', 'pubSub', 'constants',
        function ($state, session, pubSub, constants) {
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
                        scope.isLoginVisible = true;
                    };

                    scope.isActiveAction = function () {
                        var stateData = $state.current.data;
                        return { active: stateData && stateData.groupId === 'admin' };
                    };

                    scope.toggleActiveMenuPanel = function () {
                        scope.isPanelActive = (scope.isPanelActive !== true);
                    };

                    scope.getTenantLogo = function () {
                        return (scope.session && session.tenant && session.tenant.media && session.tenant.media._id) ||
                                constants.logoPath;
                    };

                    pubSub.subscribe('login', function () {
                        setUserSession();
                    });

                    pubSub.subscribe('logout', function () {
                        scope.session = null;
                        scope.$apply();
                    });

                    function setUserSession() {
                        session.getSession().then(function (session) {
                            scope.session = session;
                        });
                    }
                }
            };
        }]);
})();