(function () {
    'use strict';
    app.directive('menu', ['$rootScope', '$state', 'session', 'pubSub',
        function ($rootScope, $state, session, pubSub) {
            return  {
                replace: true,
                restrict: 'A',
                templateUrl: '/src/app/menu/menu.html',
                link: function link(scope) {

                    var scoreUpdatedSub;

                    session.getSession().then(function (session) {
                        scope.session = session;
                    });

                    scope.showAdminOptions = function () {
                        $state.go('app.admin.tenant');
                    };

                    scope.showLoginDialog = function () {
                        scope.credentials = {};
                        scope.showLogin = true;
                    };

                    scope.login = function () {
                        var userName = scope.credentials.userName;
                        var password = scope.credentials.password;
                        session.login(userName, password).then(function (session) {
                            if (session) {
                                $rootScope.$emit('authenticatedUser', session);
                                scope.session = session;
                                scope.showLogin = false;
                            } else {
                                alert('LOGIN INCORRECTO');
                            }
                        });
                    };

                    scope.logout = function () {
                        session.logout().then(function () {
                            scope.session = undefined;
                        });
                    };

                    scope.isActiveAction = function () {
                        var stateData = $state.current.data;
                        return { active: stateData && stateData.groupId === 'admin' };
                    };

                    scope.setProgressWidth = function () {
                        if(!scope.score) {
                            return null;
                        }
                        return {
                            width: ((scope.score.runnedQuestions /
                                    scope.score.totalQuestions) * 100) + '%'
                        };
                    };

                    scoreUpdatedSub = pubSub.subscribe('scoreUpdated', function (msg, data) {
                        scope.score = data;
                        console.log(scope.score)
                        scope.$apply();
                    });

                    scope.$on('$destroy', function () {
                        pubSub.unsubscribe(scoreUpdatedSub);
                    });
                }
            };
        }]);
})();