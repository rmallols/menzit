'use strict';

app.controller('ResultsCtrl', ['$scope', '$state', '$timeout', '$interval', 'http', 'pubSub',
    function ($scope, $state, $timeout, $interval, http, pubSub) {

        var scoreUpdatedSub, updateScoreIntervalFn;

        scoreUpdatedSub = pubSub.subscribe('scoreUpdated', function (msg, data) {
            if (data.runnedQuestions === data.totalQuestions) {
                finishTest(data.score);
            }
        });

        $scope.$on('$destroy', function () {
            pubSub.unsubscribe(scoreUpdatedSub);
        });

        function finishTest(score) {
            displayResult(score);
            saveScore(score);
            loadBestResults();
        }

        function loadBestResults() {
            http.get('/rest/scores?categoryId=' + $state.params.categoryId)
                .then(function (bestResults) {
                    console.log('CH', bestResults)
                    $scope.bestResults = bestResults;
                });
        }

        function displayResult(score) {
            $timeout(function () {
                $scope.score = 0;
                updateScoreIntervalFn = $interval(function () {
                    if ($scope.score < score) {
                        $scope.score += 5;
                    } else {
                        $interval.cancel(updateScoreIntervalFn);
                    }
                }, 20);
            }, 3500);
        }

        function saveScore(score) {
            http.post('/rest/scores/', { score: score, categoryId: $state.params.categoryId });
        }
    }]);