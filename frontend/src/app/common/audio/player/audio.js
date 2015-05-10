'use strict';

app.directive('audio', ['$sce', 'http', function ($sce, http) {
    return {
        restrict: 'A',
        templateUrl: 'audio.html',
        replace: true,
        scope: {
            audio: '=',
            ngDisabled: '=',
            beforePlay: '&',
            type: '@'
        },
        link: function (scope, element) {

            var base64Data;

            scope.$watch('audio', function (audio) {
                if(audio) {
                    manageAudioSource(audio, scope.type);
                }
            });

            function setAudioSrc(inlineAudio) {
                var sourceElement = element.find('source')[0];
                sourceElement.setAttribute('src', $sce.trustAsResourceUrl(inlineAudio));
            }

            function play() {
                var audioElement = element.find('audio')[0];
                audioElement.pause();
                audioElement.load();
                audioElement.play();
            }

            function manageAudioSource(audio, type) {
                if(type === 'url') {
                    manageAudioSourceFromUrl(audio);
                } else if(type === 'inline') {
                    manageAudioSourceFromBase64(audio);
                }
            }

            function manageAudioSourceFromUrl(audio) {
                http.get('/rest/audio/' + audio).then(function (response) {
                    base64Data = response.data;
                    setAudioSrc(base64Data);
                });
            }

            function manageAudioSourceFromBase64(audio) {
                base64Data = audio;
                setAudioSrc(base64Data);
            }

            scope.play = function () {
                var beforePlayHandler = scope.beforePlay();
                if(beforePlayHandler) {
                    beforePlayHandler.then(function () {
                        setAudioSrc(scope.audio);
                        play();
                    });
                } else {
                    play();
                }
            };
        }
    };
}]);