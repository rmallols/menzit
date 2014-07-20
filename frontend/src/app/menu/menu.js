(function() {
    'use strict';
    app.directive('menu',[function () {
        return  {
            replace: true,
            restrict: 'A',
            templateUrl: '/src/app/menu/menu.html',
            link: function link(scope) {

                scope.credentials = {};

                scope.showLoginDialog = function() {
                    scope.showLogin = true;
                }

                scope.login = function() {
                    console.log('YEAAAH!', scope.credentials);
                }
            }
        };
    }]);
})();