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
                element.find('audio')[0].play();
            };

            scope.getAudioSrc = function (audio) {
                var encodedAudio, endpoint, lang, url;
                if(audio) {
                    encodedAudio = encodeURIComponent(audio.toLowerCase());
                    endpoint = 'http://translate.google.com/translate_tts';
                    lang = 'en';
                    url = endpoint + '?ie=utf-8&tl=' + lang + '&q=' + encodedAudio;
                    return $sce.trustAsResourceUrl(url);
                }
                return '';
            };
        }
    };
}]);