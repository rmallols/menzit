(function () {
    'use strict';
    app.directive('dialog', [function () {
        return  {
            replace: true,
            restrict: 'A',
            transclude: true,
            scope: {
                title: '@',
                mzIf: '='
            },
            templateUrl: '/src/app/dialog/dialog.html',
            link: function link(scope) {

                scope.hideDialog = function () {
                    scope.mzIf = false;
                };

                angular.element(document).bind("keyup", function (e) {
                    if (e.keyCode === 27) {
                        scope.hideDialog();
                        scope.$apply();
                    }
                });
            }
        };
    }]);

    app.directive('centered', [function () {
        return  {
            restrict: 'A',
            link: function link(scope, element) {

                var elementHeight = element.outerHeight(),
                    elementWidth = element.outerWidth();
                scope.centerBox = function () {
                    return {
                        marginTop: -(elementHeight / 2),
                        marginLeft: -(elementWidth / 2)
                    };
                };
            }
        };
    }]);
})();