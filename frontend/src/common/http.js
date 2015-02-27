'use strict';

menzit.config(['$httpProvider', function ($httpProvider) {
    //WE CANNOT CACHE AT LEAST SOME OF THE QUERIES AS I.E.
    //IF A CATEGORY IS UPDATED IT WON'T BE REFRESHED AFTERWARDS ON THE LIST
    //$httpProvider.defaults.cache = true;

    // alternatively, register the interceptor via an anonymous factory
    $httpProvider.interceptors.push(['loading', function(loading) {
        return {
            'request': function(config) {
                loading.start();
                return config;
            },

            'response': function(response) {
                loading.done();
                return response;
            }
        };
    }]);
}]);

menzit.service('http', ['$http', '$q', function ($http, $q) {

    function get(url) {
        var deferred = $q.defer();
        $http.get(url).then(function (response) {
            deferred.resolve(response.data);
        });
        return deferred.promise;
    }

    function post(url, data, headers) {
        var deferred = $q.defer();
        $http.post(url, data, headers).then(function (response) {
            deferred.resolve(response.data);
        });
        return deferred.promise;
    }

    function put(url, data, headers) {
        var deferred = $q.defer();
        $http.put(url, data, headers).then(function (response) {
            deferred.resolve(response.data);
        });
        return deferred.promise;
    }

    function remove(url) {
        var deferred = $q.defer();
        $http.delete(url).then(function (response) {
            deferred.resolve(response.data);
        });
        return deferred.promise;
    }

    return  {
        get: get,
        post: post,
        put: put,
        delete: remove
    };
}]);
