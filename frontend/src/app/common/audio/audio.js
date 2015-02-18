'use strict';

app.directive('audio', ['$sce', function ($sce) {
    return {
        restrict: 'A',
        templateUrl: 'audio.html',
        replace: true,
        scope: {
            audio: '='
        },
        link: function (scope, element) {

            scope.play = function () {
                var audioElement = element.find('audio')[0];
                audioElement.pause();
                audioElement.load();
                audioElement.play();
            };

            scope.getAudioSrc = function (audio) {
                var encodedAudio, endpoint;
                if(audio) {
                    encodedAudio = encodeURIComponent(audio.toLowerCase());
                    endpoint = 'http://tts-api.com/tts.mp3';
                    return $sce.trustAsResourceUrl(endpoint + '?q=' + encodedAudio);
                }
                return '';
            };
        }
    };
}]);