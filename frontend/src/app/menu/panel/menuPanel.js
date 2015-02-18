'use strict';

app.directive('menuPanel', ['$rootScope', '$state', 'session', 'pubSub',
    function ($rootScope, $state, session, pubSub) {
    return {
        restrict: 'E',
        templateUrl: 'menuPanel.html',
        replace: true,
        scope: {
            isActive: '='
        },
        link: function (scope) {

            scope.session = {};

            setUserSession();

            scope.isActiveItem = function (item) {
                return {
                    active: item === ($state.params.current || ($state.current.data && $state.current.data.groupId))
                };
            };

            scope.logout = function () {
                session.logout().then(function () {
                    scope.isActive = false;
                    $state.go('app.categories');
                });
            };

            scope.hideMenuPanel = function () {
                scope.isActive = false;
            };

            scope.getUserName = function (userSession) {
                var userName;
                if(userSession.firstName) {
                    userName = userSession.firstName + (userSession.lastName ? ' ' + userSession.lastName : '');
                } else if(userSession.lastName) {
                    userName = userSession.lastName;
                } else {
                    userName = userSession.userName;
                }
                return userName;
            };

            $rootScope.$on('$stateChangeSuccess', function () {
                scope.isActive = false;
            });

            pubSub.subscribe('login', function () {
                setUserSession();
            });

            function setUserSession() {
                session.getSession().then(function (session) {
                    scope.session = session;
                });
            }
        }
    };
}]);