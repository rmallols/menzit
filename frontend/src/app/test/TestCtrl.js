'use strict';

app.controller('TestCtrl', ['$scope', '$timeout', 'pubSub', function ($scope, $timeout, pubSub) {

    $scope.isTestInProgress = true;

    var scoreUpdatedSub = pubSub.subscribe('testFinished', function (msg, data) {
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