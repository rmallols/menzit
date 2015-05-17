'use strict';

app.controller('QuestionsSpeechCtrl', ['$scope', '$controller', '$state', 'record', 'graph', 'http',
    function ($scope, $controller, $state, record, graph, http) {

    var maxY;

    $scope.graphs = {};
    $scope.debug = false;
    $scope.isRecording = false;

    $controller('BaseQuestionCtrl', { $scope: $scope });

    $scope.initializeTest().then(function () {
        http.get('/rest/audio/' + $scope.question.question.audio._id).then(function (response) {
            $scope.fingerprintRecordedAudio = response.data;
            graph.loadMusic($scope.fingerprintRecordedAudio).then(function (response) {
                $scope.graphs.fingerprint = {
                    size: response.size
                };
                if($scope.debug) {
                    $scope.graphs.fingerprint.src = response.src;
                    $scope.graphs.fingerprint.url = response.url;
                }
                maxY = response.maxY;
            });
        });
    });

    $scope.startRecording = function() {
        $scope.isRecording = true;
        $scope.isSuccess = false;
        $scope.isError = false;
        record.record();
    };

    $scope.stopRecording = function() {
        $scope.isRecording = false;
        record.get().then(function (recordedUrl) {
            $scope.userVoiceRecordedAudio = recordedUrl.base64;
            graph.loadMusic(recordedUrl.base64, maxY).then(function (response) {
                $scope.graphs.userVoice = {
                    size: response.size
                };
                if($scope.debug) {
                    $scope.graphs.userVoice.src = response.src;
                    $scope.graphs.userVoice.url = response.url;
                }
                if(isOk($scope.graphs.fingerprint.size, $scope.graphs.userVoice.size)) {
                    $scope.setCorrectAnswer();
                    $scope.isSuccess = true;
                } else {
                    $scope.setIncorrectAnswer($scope.question._id);
                    $scope.isError = true;
                    $scope.audioInterfaceFns.play();
                }
            });
        });
    };

    $scope.$watch('question._id', function () {
        $scope.isSuccess = false;
    });

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
        var imageDiff, blockAThreshold, blockBThreshold, tolerance = 0.3;
        imageDiff = blockA - blockB;
        imageDiff = (imageDiff < 0) ? -imageDiff : imageDiff;
        blockAThreshold = imageDiff / blockA < tolerance;
        blockBThreshold = imageDiff / blockB < tolerance;
        return blockAThreshold && blockBThreshold;
    }
}]);