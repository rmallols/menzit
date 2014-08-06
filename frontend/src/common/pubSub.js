'use strict';

menzit.service('pubSub', [function () {

    function publish(eventName, data) {
        PubSub.publish( eventName, data );
    }

    function subscribe(eventName, subscribeFn) {
        return PubSub.subscribe(eventName, subscribeFn);
    }

    function unsubscribe(subscribeFn) {
        PubSub.unsubscribe( subscribeFn );
    }

    return  {
        publish: publish,
        subscribe: subscribe,
        unsubscribe: unsubscribe
    };
}]);
