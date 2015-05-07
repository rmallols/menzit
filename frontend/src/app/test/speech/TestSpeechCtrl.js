'use strict';

app.controller('TestSpeechCtrl', ['$scope', 'record', 'graph', function ($scope, record, graph) {

    $scope.graphs = [];

    var maxY;

    graph.loadMusic('/rest/external-audio?q=vegetables').then(function (response) {
        $scope.graphs.push({
            size: response.size
        });
        maxY = response.maxY;
    });

    $scope.record = function () {
        record.record();
    };

    $scope.addRecorded = function () {
        record.get().then(function (recordedUrl) {
            graph.loadMusic(recordedUrl, maxY).then(function (response) {
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
            if(!compareBlock(sourceImageSizeBlock, fingerprintImageSizeBlocks[$index])) {
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