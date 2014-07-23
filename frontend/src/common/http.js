'use strict';

app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.cache = true;
}]);

app.service('http', ['$http', '$q', function ($http, $q) {

    function get(url) {
        var deferred = $q.defer();
        $http.get(url).then(function (response) {
            deferred.resolve(response.data);
        });
        return deferred.promise;
    }

    function post(url, data) {
        var deferred = $q.defer();
        $http.post(url, data).then(function (response) {
            deferred.resolve(response.data);
        });
        return deferred.promise;
    }

    function put(url, data) {
        var deferred = $q.defer();
        $http.put(url, data).then(function (response) {
            deferred.resolve(response.data);
        });
        return deferred.promise;
    }

    return  {
        get: get,
        post: post,
        put: put
    };
}]);
