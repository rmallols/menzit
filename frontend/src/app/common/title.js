'use strict';

app.directive('title', [function () {
    return  {
        link: function link(scope, element, attrs) {
            element.data('powertip', attrs.title)
            element.powerTip({});
        }
    };
}]);