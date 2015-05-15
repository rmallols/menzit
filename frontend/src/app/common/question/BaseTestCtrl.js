'use strict';

app.controller('BaseTestCtrl', ['$scope', '$timeout', 'pubSub', function ($scope, $timeout, pubSub) {

    $scope.isTestInProgress = true;

    var scoreUpdatedSub = pubSub.subscribe('testFinished', function () {
        finishTest();
    });

    $scope.$on('$destroy', function () {
        pubSub.unsubscribe(scoreUpdatedSub);
    });

    function finishTest() {
        $timeout(function () {
            $scope.isTestInProgress = false;
            $timeout(function () {
                $scope.isTestFinished = true;
            }, 1000);
        }, 1500);
    }
}]);