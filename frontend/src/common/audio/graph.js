menzit.factory('graph', ['$q', function ($q) {

    // AUDIO CONTEXT
    window.AudioContext = window.AudioContext || window.webkitAudioContext;

    if (!AudioContext) alert('This site cannot be run in your Browser. Try a recent Chrome or Firefox. ');

    // CANVAS
    var canvasWidth = 512, canvasHeight = 120;



    function appendCanvas() {
        var newCanvas = createCanvas(canvasWidth, canvasHeight);
        return newCanvas;
    }

    // MUSIC LOADER + DECODE
    function loadMusic(url) {
        var deferred = $q.defer();

        var audioContext = new AudioContext();

        var newCanvas = appendCanvas();
        var context = newCanvas.getContext('2d');

        var req = new XMLHttpRequest();
        req.open("GET", url, true);
        req.responseType = "arraybuffer";
        req.onreadystatechange = function (e) {
            if (req.readyState == 4) {
                if (req.status == 200) {
                    audioContext.decodeAudioData(req.response,
                        function (buffer) {
                            var imageSize = displayBuffer(newCanvas, context, buffer, url);
                            deferred.resolve({ src: newCanvas.toDataURL("image/png"), url: url, size: imageSize });
                        }, onDecodeError);
                } else {
                    alert('error during the load.Wrong url or cross origin issue', req.status);
                }
            }
        };
        req.send();

        return deferred.promise;
    }

    function onDecodeError() {
        alert('error while decoding your file.');
    }

    // MUSIC DISPLAY
    function displayBuffer(newCanvas, context, buff, url) {
        var leftChannel = buff.getChannelData(0); // Float32Array describing left channel
        var lineOpacity = canvasWidth / leftChannel.length;
        var noiseThreeshold = 1.5;
        context.save();
        context.fillStyle = '#000';
        context.fillRect(0, 0, canvasWidth, canvasHeight);
        context.strokeStyle = '#121';
        context.globalCompositeOperation = 'lighter';
        context.translate(0, canvasHeight / 2);
        context.globalAlpha = 0.06; // lineOpacity ;

        var normalisedLeftChannel = []
        for (var i = 0; i < leftChannel.length; i++) {
            var y = leftChannel[i] * canvasHeight / 2;
            if(y > noiseThreeshold || y < -noiseThreeshold) {
                normalisedLeftChannel[normalisedLeftChannel.length] = leftChannel[i];
            }
        }

        var totalLength = normalisedLeftChannel.length;
        var firstHalf = 0, secondHalf = 0;
        for(var j = 0; j < totalLength; j++) {
            // on which line do we get ?
            var x = Math.floor(canvasWidth * j / normalisedLeftChannel.length);
            var y = normalisedLeftChannel[j] * canvasHeight / 2;
            context.beginPath();
            context.moveTo(x, 0);
            context.lineTo(x + 1, y);
            context.stroke();


            if(j === Math.floor(totalLength / 2)) {
                firstHalf = newCanvas.toDataURL("image/png").length
            } else if(j === normalisedLeftChannel.length - 1) {
                secondHalf = newCanvas.toDataURL("image/png").length - firstHalf;

            }
        }

        context.restore();

        return [firstHalf, secondHalf];
    }

    function createCanvas(w, h) {
        var newCanvas = document.createElement('canvas');
        newCanvas.width = w;
        newCanvas.height = h;
        return newCanvas;
    }

    return {
        loadMusic: loadMusic
    }
}])