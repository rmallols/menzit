'use strict';

app.factory('testAdmin', [function () {

    function getNormalizedInputAnswers(answers) {
        var maxAnswers = 4;
        for(var i = answers.length; i < maxAnswers; i++) {
            answers.push({});
        }
        return answers;
    }

    function getNormalizedOutputAnswers(answers) {
        var normalizedAnswers = [];
        angular.forEach(answers, function(answer) {
           if(answer.title || answer.image) {
               normalizedAnswers.push(answer);
           }
        });
        return normalizedAnswers;
    }

    return {
        getNormalizedInputAnswers: getNormalizedInputAnswers,
        getNormalizedOutputAnswers: getNormalizedOutputAnswers
    };
}]);