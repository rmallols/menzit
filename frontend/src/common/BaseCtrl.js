'use strict';

app.controller('BaseCtrl', ['$rootScope', '$scope', '$state',
    function ($rootScope, $scope, $state) {

        var stateName, stateGroupId;

        setCurrentStateStyleClasses($state.current);
        $rootScope.$on('$stateChangeSuccess', function (e, toState) {
            setCurrentStateStyleClasses(toState);
        });

        $scope.getRootStyleClasses = function () {
            var rootStyleClasses = {};
            rootStyleClasses.root = true;
            rootStyleClasses[stateName] = true;
            rootStyleClasses[stateGroupId] = true;
            return rootStyleClasses;
        };

        function setCurrentStateStyleClasses(currentState) {
            stateName = currentState.name.replace(/\./g, "-");
            stateGroupId = (currentState.data) ? currentState.data.groupId.replace(/\./g, "-")
                : '';
        }
    }]);