'use strict';

menzit.directive('login', ['$rootScope', 'session', function ($rootScope, session) {
    return {
        templateUrl: 'login.html',
        scope: {
            visible: '='
        },
        link: function (scope) {

            scope.credentials = {};

            scope.login = function () {
                var userName = scope.credentials.userName,
                    password = scope.credentials.password,
                    remember = scope.credentials.remember;
                session.login(userName, password, remember).then(onLogin);
            };

            function onLogin(session) {
                if (session) {
                    $rootScope.$emit('authenticatedUser', session);
                    scope.session = session;
                    scope.visible = false;
                } else {
                    window.alert('Incorrect login');
                }
            }
        }
    };
}]);