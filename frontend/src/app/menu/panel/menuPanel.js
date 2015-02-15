'use strict';

app.directive('menuPanel', [function () {
    return {
        restrict: 'E',
        templateUrl: 'menuPanel.html',
        replace: true,
        scope: {
            isActive: '='
        },
        link: function (scope) {
        }
    };
}]);