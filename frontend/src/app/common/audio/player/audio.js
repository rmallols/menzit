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

            if(scope.type === 'url') {
                http.get('/audio/' + scope.audio).then(function (response) {
                    base64Data = response.data;
                    setAudioSrc(base64Data);
                });
            } else if(scope.type === 'inline') {
                base64Data = scope.audio;
                setAudioSrc(base64Data);
            }

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