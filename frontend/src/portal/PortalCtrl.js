'use strict';

menzit.controller('PortalCtrl', ['$scope', '$state', function ($scope, $state) {

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
}]);