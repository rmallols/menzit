'use strict';

app.controller('AdminCtrl', ['$scope', '$state', function ($scope, $state) {

    $scope.menuActions = [
        { label: 'General', icon: 'settings-general-icon', uiSref: 'mz.admin.tenant', subGroupId: 'tenant' },
        { label: 'Tests', icon: 'settings-tests-icon', uiSref: 'mz.admin.categories', subGroupId: 'categories' },
        { label: 'Users', icon: 'settings-users-icon', uiSref: 'mz.admin.users', subGroupId: 'users' }
    ];

    $scope.isActiveAction = function (targetState) {
        return { active: targetState === $state.current.data.subGroupId };
    };
}]);