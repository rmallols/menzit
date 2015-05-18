'use strict';
/*
    TODO: This is an external component that doesn't fit with any development standard
    Please refactor it to avoid breaking the rules
*/
app.factory('graph', ['$sce', '$q', function ($sce, $q) {

    // AUDIO CONTEXT
    window.AudioContext = window.AudioContext || window.webkitAudioContext;

    if (!AudioContext) alert('This site cannot be run in your Browser. Try a recent Chrome or Firefox. ');

    var audioContext = new AudioContext();

    // CANVAS
    var canvasWidth = 512, canvasHeight = 120;

    // MUSIC LOADER + DECODE
    function loadAudio(url, maxY) {
        var deferred = $q.defer();


        var newCanvas = createCanvas(canvasWidth, canvasHeight);
        var context = newCanvas.getContext('2d');

        var req = new XMLHttpRequest();
        req.open("GET", url, true);
        req.responseType = "arraybuffer";
        req.onreadystatechange = function (e) {
            if (req.readyState == 4) {
                if (req.status == 200) {
                    audioContext.decodeAudioData(req.response,
                        function (buffer) {
                            var imageData = displayBuffer(newCanvas, context, buffer, maxY);
                            deferred.resolve({
                                src: newCanvas.toDataURL("image/png"),
                                url: trustUrl(url),
                                size: imageData.segments,
                                maxY: imageData.maxY
                            });
                        }, onDecodeError);
                } else {
                    alert('error during the load.Wrong url or cross origin issue', req.status);
                }
            }
        };
        req.send();

        return deferred.promise;
    }

    function trustUrl(url) {
        return $sce.trustAsResourceUrl(url);
    }

    function onDecodeError() {
        alert('error while decoding your file.');
    }

    // MUSIC DISPLAY
    function displayBuffer(newCanvas, context, buff, maxY) {
        var leftChannel = buff.getChannelData(0); // Float32Array describing left channel
        var noiseThreeshold = 1.0;
        context.save();
        context.fillStyle = '#000';
        context.fillRect(0, 0, canvasWidth, canvasHeight);
        context.strokeStyle = '#121';
        context.globalCompositeOperation = 'lighter';
        context.translate(0, canvasHeight / 2);
        context.globalAlpha = 0.06; // lineOpacity ;

        var normalisedLeftChannel = [];
        var currentMaxY = 0;

        for (var i = 0; i < leftChannel.length; i++) {
            var y = leftChannel[i] * canvasHeight / 2;
            if(y > noiseThreeshold || y < -noiseThreeshold) {
                normalisedLeftChannel[normalisedLeftChannel.length] = leftChannel[i];
                if(y > currentMaxY) {
                    currentMaxY = y;
                }
            }
        }

        if(!maxY) {
            maxY = currentMaxY;
        }
        var maxYFactor = maxY / currentMaxY;

        var totalLength = normalisedLeftChannel.length;
        var firstHalf = 0, secondHalf = 0;

        var currentMaxFakeY = 0;

        for(var j = 0; j < totalLength; j++) {
            // on which line do we get ?
            var x = Math.floor(canvasWidth * j / normalisedLeftChannel.length);
            var y = (normalisedLeftChannel[j] * canvasHeight / 2) * maxYFactor;
            context.beginPath();
            context.moveTo(x, 0);
            context.lineTo(x + 1, y);
            context.stroke();

            if(y > currentMaxFakeY) {
                currentMaxFakeY = y;
            }


            if(j === Math.floor(totalLength / 2)) {
                firstHalf = newCanvas.toDataURL("image/png").length
            } else if(j === normalisedLeftChannel.length - 1) {
                secondHalf = newCanvas.toDataURL("image/png").length - firstHalf;
            }
        }
        context.restore();

        return {
            segments: [firstHalf, secondHalf],
            maxY: currentMaxY
        };
    }

    function createCanvas(w, h) {
        var newCanvas = document.createElement('canvas');
        newCanvas.width = w;
        newCanvas.height = h;
        return newCanvas;
    }

    return {
        loadAudio: loadAudio
    };
}])