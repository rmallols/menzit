'use strict';

app.service('session', ['http', function (http) {

    function login(userName, password) {
        var credentials = { userName: userName, password: password };
        return http.post('/rest/login', credentials);
    }

    function logout() {
        return http.post('/rest/logout');
    }

    function getSession() {
        return http.get('/rest/getSession/');
    }

    return  {
        login: login,
        logout: logout,
        getSession: getSession
    };
}]);
