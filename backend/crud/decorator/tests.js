'use strict';

module.exports = {

    get: {

        filter: function (request, callback) {
            var filter = { query: { categoryId: request.query.categoryId }};
            callback(filter);
        },

        //We cannot remove the 'isCorrect' flag as it's required for admin purposes
        //Then we'll need a way to conditionally keep that flag depending on
        //whether the endpoints are triggered from admin area or not
        //response: function (response, callback) {
        //    response.answers.forEach(function (answer) {
        //       delete answer.isCorrect;
        //    });
        //    callback(response);
        //}
    }
};