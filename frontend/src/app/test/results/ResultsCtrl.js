'use strict';

app.controller('ResultsCtrl', ['$scope', '$state', '$timeout', '$interval', '$q',
    '$stateParams', 'http', 'pubSub',
    function ($scope, $state, $timeout, $interval, $q, $stateParams, http, pubSub) {

        var scoreUpdatedSub, updateScoreIntervalFn, currentResult;

        scoreUpdatedSub = pubSub.subscribe('scoreUpdated', function (msg, data) {
            if (data.runnedQuestions === data.totalQuestions) {
                finishTest(data.score);
            }
        });

        $scope.$on('$destroy', function () {
            pubSub.unsubscribe(scoreUpdatedSub);
        });

        $scope.isCurrentBestResult = function (bestResult) {
            return bestResult._id === currentResult._id;
        };

        $scope.repeatTest = function () {
            $state.transitionTo($state.current, $stateParams, {
                reload: true,
                inherit: false,
                notify: true
            });
        };

        $scope.goToHome = function () {
            $state.go('app.categories');
        };

        function finishTest(score) {
            displayResult(score);
            saveScore(score).then(loadBestResults);
        }

        function loadBestResults() {
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
                        $scope.score += 1;
                    } else {
                        $interval.cancel(updateScoreIntervalFn);
                        $timeout(function () {
                            $scope.showBestResults = true;
                        }, 3000);
                    }
                }, 5);
            }, 3500);
        }

        function saveScore(score) {
            var deferred = $q.defer();
            http.post('/rest/scores/', { score: score, categoryId: $state.params.categoryId }
            ).then(function (savedScore) {
                    currentResult = savedScore;
                    deferred.resolve(savedScore);
                });
            return deferred.promise;
        }
    }]);