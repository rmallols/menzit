'use strict';

app.controller('TenantInviteCtrl', ['$scope', '$state', 'http', function ($scope, $state, http) {

    var mailRegExp = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    $scope.parseUsers = function (usersString) {
        $scope.showError = false;
        $scope.usersList = [];
        var usersList = usersString.split(','), invalidCounter = 0;
        angular.forEach(usersList, function (user, $index) {
            user = user.trim();
            if(user !== '') {
                $scope.usersList[$index] = user;
                if(!mailRegExp.test(user)) {
                    invalidCounter++;
                }
            }
        });
        $scope.isListValid = (invalidCounter === 0);
    };

    $scope.submit = function (usersList, isListValid) {
        if(isListValid) {
            http.post('/rest/invite', { usersList: usersList }).then(function () {
                $state.go('app.admin.tenants');
            });
        } else {
            $scope.showError = true;
        }
    };
}]);