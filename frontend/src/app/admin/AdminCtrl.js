'use strict';

app.controller('AdminCtrl', ['$scope', '$state', function ($scope, $state) {

    $scope.menuActions = [
        { label: 'Tenant', uiSref: 'mz.admin.tenant' },
        { label: 'Tests', uiSref: 'mz.admin.tests' },
        { label: 'Users', uiSref: 'mz.admin.users' }
    ];

    $scope.isActiveAction = function (targetState) {
        return { active: targetState === $state.current.name };
    };
}]);