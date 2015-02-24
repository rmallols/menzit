'use strict';

menzit.service('session', ['$q', 'http', 'pubSub', function ($q, http, pubSub) {

    var session;

    function login(userName, password, remember) {
        var deferred = $q.defer(),
            credentials = { userName: userName, password: password, remember: remember };
        http.post('/rest/login', credentials).then(function (retrievedSession) {
            session = retrievedSession;
            pubSub.publish('login');
            deferred.resolve(retrievedSession);
        });
        return deferred.promise;
    }

    function logout() {
        var deferred = $q.defer();
        http.post('/rest/logout').then(function () {
            session = undefined;
            pubSub.publish('logout');
            deferred.resolve();
        });
        return deferred.promise;
    }

    function getSession() {
        var deferred = $q.defer();
        if(session) {
            deferred.resolve(session);
        } else {
            http.get('/rest/session/').then(function(retrievedSession) {
                session = retrievedSession;
                deferred.resolve(session);
            });
        }
        return deferred.promise;
    }

    function isLoggedUser() {
        return session;
    }

    function isSuperAdminUser() {
        return session && session.role === 2;
    }

    function isAdminUser() {
        return session && session.role === 1;
    }

    function isPlainUser() {
        return isLoggedUser() && !isSuperAdminUser() && isPlainUser();
    }

    function hasAdminRole() {
        return isAdminUser() || isSuperAdminUser();
    }

    return  {
        login: login,
        logout: logout,
        getSession: getSession,
        isLoggedUser: isLoggedUser,
        isSuperAdminUser: isSuperAdminUser,
        isAdminUser: isAdminUser,
        isPlainUser: isPlainUser,
        hasAdminRole: hasAdminRole
    };
}]);
