'use strict';

var read = require('../../read');

module.exports = {

    get: {
        filter: function (request, callback) {
            console.log('req')
            var filter = { query: { categoryId: request.query.categoryId }};
            callback(filter);
        },

        response: function (response, callback) {
            console.log('OUT')
            read.findOne(response.create.authorId, 'users', function (user) {
                console.log('GOT', user);
                response.user = user;
                delete response.create.authorId;
                callback(response);
            });
        }
    }
};