'use strict';

menzit.controller('AppCtrl', ['$rootScope', '$scope', '$state',
    function ($rootScope, $scope, $state) {

        var stateName, stateGroupId;

        setCurrentStateStyleClasses($state.current);
        $rootScope.$on('$stateChangeSuccess', function (e, toState) {
            setCurrentStateStyleClasses(toState);
        });

        $scope.getPageStyleClasses = function () {
            var rootStyleClasses = {};
            rootStyleClasses.root = true;
            rootStyleClasses[stateName] = true;
            rootStyleClasses[stateGroupId] = true;
            return rootStyleClasses;
        };

        function setCurrentStateStyleClasses(currentState) {
            stateName = normaliseFormat(currentState.name);
            stateGroupId = (currentState.data) ? 'state-' + normaliseFormat(currentState.data.groupId)
                : '';
        }

        function normaliseFormat(string) {
            return string.replace(/\./g, "-")
                .replace(/([a-z][A-Z])/g, function (g) { return g[0] + '-' + g[1].toLowerCase(); });
        }
    }]);