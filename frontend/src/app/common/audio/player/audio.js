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

            scope.normalizedAudio = $sce.trustAsResourceUrl(scope.audio);

            scope.play = function () {
                var audioElement = element.find('audio')[0];
                audioElement.pause();
                audioElement.load();
                audioElement.play();
            };
        }
    };
}]);