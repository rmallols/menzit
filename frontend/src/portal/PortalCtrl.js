'use strict';

menzit.controller('PortalCtrl', ['$rootScope', '$scope', '$state',
    function ($rootScope, $scope, $state) {

    $scope.getActiveClass = function (targetState) {
        return {
            active: $state.current.name === targetState
        };
    };

    $scope.getPageStyleClass = function () {
        var pageStyleClass = {};
        pageStyleClass[$state.current.name.replace(/\./, '-')] = true;
        return pageStyleClass;
    };

    $rootScope.$on('$stateChangeSuccess', function () {
       $scope.visibleMobileMenu = false;
    });
}]);