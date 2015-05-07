'use strict';
app.directive('questionAdmin', [function () {
    return {
        replace: true,
        templateUrl: 'questionAdmin.html',
        scope: {
            question: '=questionAdmin',
            onSubmitImageRequestFn: '=',
            onSubmitAudioRequestFn: '='
        }
    };
}]);