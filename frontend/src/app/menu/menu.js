(function() {
    'use strict';
    app.directive('menu',['session', function (session) {
        return  {
            replace: true,
            restrict: 'A',
            templateUrl: '/src/app/menu/menu.html',
            link: function link(scope) {

                session.getSession().then(function (session) {
                    scope.session = session;
                });

                scope.showAdminOptions = function() {
                    alert('HERE ARE THE ADMIN OPTIONS')
                };

                scope.showLoginDialog = function() {
                    scope.credentials = {};
                    scope.showLogin = true;
                };

                scope.login = function() {
                    var userName = scope.credentials.userName;
                    var password = scope.credentials.password;
                    session.login(userName, password).then(function(session) {
                        if(session) {
                            scope.session = session;
                            scope.showLogin = false;
                        } else {
                            alert('LOGIN INCORRECTO');
                        }
                    });
                };

                scope.logout = function() {
                    session.logout().then(function () {
                        scope.session = undefined;
                    });
                };
            }
        };
    }]);
})();