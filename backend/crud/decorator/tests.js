'use strict';

module.exports = {

    get: {

        filter: function (request, callback) {
            var filter = { query: { categoryId: request.query.categoryId }};
            callback(filter);
        },

        response: function (response, callback) {
            response.answers.forEach(function (answer) {
               delete answer.isCorrect;
            });
            callback(response);
        }
    }
};