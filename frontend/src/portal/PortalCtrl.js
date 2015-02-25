'use strict';

menzit.controller('PortalCtrl', ['$rootScope', '$scope', '$state', 'session', 'pubSub',
    function ($rootScope, $scope, $state, session, pubSub) {

    $scope.session = {};

    setUserSession();

    $scope.getActiveClass = function (targetState) {
        return {
            active: $state.current.name === targetState
        };
    };

    $scope.getPageStyleClass = function () {
        var pageStyleClass = {};
        pageStyleClass['state-' + $state.current.name.replace(/\./, '-')] = true;
        return pageStyleClass;
    };

    $scope.showLoginDialog = function () {
        $scope.isLoginVisible = true;
    };

    $scope.getUserName = function (userSession) {
        var userName;
        if(userSession.firstName) {
            userName = userSession.firstName;
        } else if(userSession.lastName) {
            userName = userSession.lastName;
        } else {
            userName = userSession.userName;
        }
        return userName;
    };

    $scope.logout = function () {
        session.logout().then(function () {
            $scope.session = null;
        });
    };

    $rootScope.$on('$stateChangeSuccess', function () {
       $scope.visibleMobileMenu = false;
    });

    pubSub.subscribe('login', function () {
        setUserSession();
    });

    function setUserSession() {
        session.getSession().then(function (session) {
            $scope.session = session;
        });
    }
}]);