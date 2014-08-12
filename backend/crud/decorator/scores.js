'use strict';

var read = require('../read');

module.exports = {

    get: {
        filter: function (request, callback) {
            var filter = {
                query: { categoryId: request.query.categoryId },
                sort: { score: -1 }
            };
            callback(filter);
        },

        response: function (response, callback) {
            console.log('normalizing response, AQUI YA ESTA MAL...', response)
            if(response.create.authorId) {
                read.findOne(response.create.authorId, 'users', function (user) {
                    response.user = user;
                    delete response.create.authorId;
                    callback(response);
                });
            } else {
                callback(response);
            }
        }
    }
};