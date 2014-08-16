'use strict';

menzit.service('loading', ['$timeout', function ($timeout) {

    function start() {
        NProgress.inc();
    }

    function done() {
        $timeout(function() {
            NProgress.done();
        }, 1000);
    }

    return  {
        start: start,
        done: done
    };
}]);
