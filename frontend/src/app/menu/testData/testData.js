(function () {
    'use strict';

    app.controller('TestDataCtrl', ['$scope', 'pubSub', function ($scope, pubSub) {

        var scoreUpdatedSub;

        $scope.setProgressWidth = function () {
            if (!$scope.testData) {
                return null;
            }
            return {
                width: (($scope.testData.runnedQuestions /
                    $scope.testData.totalQuestions) * 100) + '%'
            };
        };

        scoreUpdatedSub = pubSub.subscribe('scoreUpdated', function (msg, data) {
            $scope.testData = data;
            $scope.$apply();
        });

        $scope.$on('$destroy', function () {
            pubSub.unsubscribe(scoreUpdatedSub);
        });
    }]);
})();