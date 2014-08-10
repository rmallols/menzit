(function () {
    'use strict';

    app.controller('TestDataCtrl', ['$scope', '$interval', 'pubSub',
        function ($scope, $interval, pubSub) {

            var scoreUpdatedSub, updateScoreIntervalFn;

            $scope.score = 0;

            $scope.setProgressWidth = function () {
                if (!$scope.testData) {
                    return null;
                }
                return {
                    width: ((($scope.testData.runnedQuestions) /
                        $scope.testData.totalQuestions) * 100) + '%'
                };
            };

            scoreUpdatedSub = pubSub.subscribe('scoreUpdated', function (msg, data) {
                $scope.testData = data;
                $scope.$apply();

                updateScoreIntervalFn = $interval(function () {
                    if ($scope.score < $scope.testData.score) {
                        $scope.score += 5;
                    } else {
                        $interval.cancel(updateScoreIntervalFn);
                    }
                }, 20);
            });

            $scope.getCurrentQuestion = function () {
                return ($scope.testData.runnedQuestions < $scope.testData.totalQuestions) ?
                    $scope.testData.runnedQuestions + 1:
                    $scope.testData.runnedQuestions;
            };

            $scope.$on('$destroy', function () {
                $interval.cancel(updateScoreIntervalFn);
                pubSub.unsubscribe(scoreUpdatedSub);
            });
        }]);
})();