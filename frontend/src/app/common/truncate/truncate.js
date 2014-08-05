'use strict';

app.directive('truncate', ['$timeout', function ($timeout) {
    return  {
        link: function link(scope, element) {
            $timeout(function() {
                element.dotdotdot({
                    watch: "window"
                });
            });
        }
    };
}]);