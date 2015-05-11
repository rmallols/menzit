'use strict';

app.controller('TestSpeechCtrl', ['$scope', '$state', 'record', 'graph', 'http',
    function ($scope, $state, record, graph, http) {

        $scope.graphs = [];

        http.get('/rest/tests?categoryId=' + $state.params.categoryId).then(function (questions) {
            http.get('/rest/audio/' + questions[0].question.audio._id).then(function (response) {
                $scope.recordedAudio = response.data;
                graph.loadMusic($scope.recordedAudio).then(function (response) {
                    $scope.graphs.push({
                        size: response.size
                    });
                    maxY = response.maxY;
                });
            });


            //availableQuestions = questions;
            //setScore();
            //setCurrentQuestion();
        });


        $scope.isRecording = false;

        $scope.toggleRecording = function () {
            if(!$scope.isRecording) {
                startRecording();
            } else {
                stopRecording();
            }
        };

        function startRecording() {
            $scope.isRecording = true;
            record.record();
        }

        function stopRecording() {
            $scope.isRecording = false;
            record.get().then(function (recordedUrl) {
                graph.loadMusic(recordedUrl.base64, maxY).then(function (response) {
                    $scope.graphs.push({
                        size: response.size
                    });
                    $scope.isOk = isOk($scope.graphs[0].size, $scope.graphs[1].size);
                });
            });
        }



        var maxY;

        $scope.record = function () {
            record.record();
        };

        $scope.addRecorded = function () {
            record.get().then(function (recordedUrl) {
                graph.loadMusic(recordedUrl.base64, maxY).then(function (response) {
                    $scope.graphs.push({
                        size: response.size
                    });
                    $scope.isOk = isOk($scope.graphs[0].size, $scope.graphs[1].size);
                });
            });
        };

        function isOk(sourceImageSizeBlocks, fingerprintImageSizeBlocks) {
            var ok = true;
            sourceImageSizeBlocks.forEach(function (sourceImageSizeBlock, $index) {
                if (!compareBlock(sourceImageSizeBlock, fingerprintImageSizeBlocks[$index])) {
                    ok = false;
                }
            });
            return ok;
        }

        function compareBlock(blockA, blockB) {
            var imageDiff, blockAThreshold, blockBThreshold;
            imageDiff = blockA - blockB;
            imageDiff = (imageDiff < 0) ? -imageDiff : imageDiff;
            blockAThreshold = imageDiff / blockA < 0.3;
            blockBThreshold = imageDiff / blockB < 0.3;
            return blockAThreshold && blockBThreshold;
        }
    }]);