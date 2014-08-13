'use strict';

app.controller('ResultsCtrl', ['$scope', '$state', '$timeout', '$interval', '$q', 'http', 'pubSub',
    function ($scope, $state, $timeout, $interval, $q, http, pubSub) {

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
            saveScore(score).then(loadBestResults);
        }

        function loadBestResults(e, i) {
            http.get('/rest/scores?categoryId=' + $state.params.categoryId)
                .then(function (bestResults) {
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
                        $scope.showBestResults = true;
                        $interval.cancel(updateScoreIntervalFn);
                    }
                }, 20);
            }, 3500);
        }

        function saveScore(score) {
            var deferred = $q.defer();
            http.post('/rest/scores/', {
                score: score,
                categoryId: $state.params.categoryId
            }).then(function(savedScore) {
                console.log('the saved score is', savedScore);
                deferred.resolve(savedScore);
            });
            return deferred.promise;
        }

        loadBestResults();
    }]);