'use strict';

menzit.directive('button', ['pubSub', function (pubSub) {
    return  {
        link: function (scope, element) {

            pubSub.subscribe('onHttpRequest', function () {
                element.attr('disabled', 'disabled');
            });

            pubSub.subscribe('onHttpResponse', function () {
                element.removeAttr('disabled');
            });
        }
    };
}]);
