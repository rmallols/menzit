(function() {
    'use strict';
    app.directive('dialog',[function () {
        return  {
            replace: true,
            restrict: 'A',
            transclude: true,
            scope: {
              mzIf: '='
            },
            templateUrl: '/src/app/dialog/dialog.html',
            link: function link(scope) {

                scope.hideDialog = function() {
                    scope.mzIf = false;
                }

                angular.element(document).bind("keyup", function(e) {
                    if(e.keyCode == 27) {
                        scope.hideDialog();
                        scope.$apply();
                    }
                });
            }
        };
    }]);
})();