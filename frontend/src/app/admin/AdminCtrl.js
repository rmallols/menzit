'use strict';

app.controller('AdminCtrl', ['$scope', '$state', function ($scope, $state) {

    $scope.menuActions = [
        { label: 'General', icon: 'settings-general-icon', uiSref: 'mz.admin.tenant' },
        { label: 'Tests', icon: 'settings-tests-icon', uiSref: 'mz.admin.categories' },
        { label: 'Users', icon: 'settings-users-icon', uiSref: 'mz.admin.users' }
    ];

    $scope.isActiveAction = function (targetState) {
        return { active: targetState === $state.current.name };
    };
}]);