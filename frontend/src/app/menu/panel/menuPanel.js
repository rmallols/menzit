'use strict';

app.directive('menuPanel', ['$rootScope', '$state', 'session', function ($rootScope, $state, session) {
    return {
        restrict: 'E',
        templateUrl: 'menuPanel.html',
        replace: true,
        scope: {
            isActive: '='
        },
        link: function (scope) {

            scope.isActiveItem = function (item) {
                return {
                    active: item === ($state.current.data && $state.current.data.groupId)
                };
            };

            scope.logout = function () {
                session.logout().then(function () {
                    scope.isActive = false;
                    $state.go('app.categories');
                });
            };

            $rootScope.$on('$stateChangeSuccess', function () {
                scope.isActive = false;
            });
        }
    };
}]);