'use strict';

app.controller('BaseSpeechQuestionCtrl', ['$scope', '$controller', '$state', 'record', 'graph', 'http',
    function ($scope, $controller, $state, record, graph, http) {

    var maxY, failedAnswers;

    $scope.graphs = {};
    $scope.debug = true;
    $scope.isRecording = false;

    $scope.startRecording = function () {
        $scope.isRecording = true;
        $scope.isSuccess = false;
        $scope.isError = false;
        record.record();
    };

    $scope.stopRecording = function () {
        $scope.isRecording = false;
        record.get().then(function (recordedUrl) {
            $scope.userVoiceRecordedAudio = recordedUrl.base64;
            graph.loadAudio(recordedUrl.base64, maxY).then(onLoadedUserVoiceAudio);
        });
    };

    $scope.markAsSolved = function () {
        $scope.audioInterfaceFns.play();
        manageSuccessAnswer();
    };

    $scope.$watch('question._id', function (newQuestionId) {
        if (newQuestionId) {
            $scope.isSuccess = false;
            $scope.showSolveAction = false;
            failedAnswers = 0;
            generateFingerprint();
        }
    });

    function generateFingerprint() {
        http.get('/rest/audio/' + $scope.question.question.audio._id).then(function (response) {
            $scope.fingerprintRecordedAudio = response.data;
            graph.loadAudio($scope.fingerprintRecordedAudio).then(onLoadedFingerprintAudio);
        });
    }

    function onLoadedFingerprintAudio(response) {
        $scope.graphs.fingerprint = {
            size: response.size
        };
        manageDebugInfo($scope.graphs.fingerprint, response);
        maxY = response.maxY;
    }

    function onLoadedUserVoiceAudio(response) {
        $scope.graphs.userVoice = {
            size: response.size
        };
        if (isOk($scope.graphs.fingerprint.size, $scope.graphs.userVoice.size)) {
            manageSuccessAnswer();
        } else {
            manageIncorrectAnswer();
        }
        manageDebugInfo($scope.graphs.userVoice, response);
    }

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
        var imageDiff, blockAThreshold, blockBThreshold, tolerance = 0.4;
        imageDiff = blockA - blockB;
        imageDiff = (imageDiff < 0) ? -imageDiff : imageDiff;
        blockAThreshold = imageDiff / blockA < tolerance;
        blockBThreshold = imageDiff / blockB < tolerance;
        return blockAThreshold && blockBThreshold;
    }

    function manageSuccessAnswer() {
        $scope.setCorrectAnswer($scope.question._id);
        $scope.isSuccess = true;
        $scope.isError = false;
    }

    function manageIncorrectAnswer() {
        $scope.setIncorrectAnswer($scope.question._id);
        $scope.isError = true;
        $scope.audioInterfaceFns.play();
        failedAnswers++;
        $scope.showSolveAction = failedAnswers >= 2;
    }

    function manageDebugInfo(source, response) {
        if ($scope.debug) {
            source.src = response.src;
            source.url = response.url;
        }
    }
}]);