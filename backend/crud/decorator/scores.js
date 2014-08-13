'use strict';

var read = require('../read');

function _decorateExistingUser(response, callback) {
    read.findOne(response.create.authorId, 'users', function (user) {
        response.user = user;
        delete response.create.authorId;
        callback(response);
    });
}

function _decorateAnonymousUser(response, callback) {
    response.user = { userName: 'Anonymous' };
    delete response.create.authorId;
    callback(response);
}

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
            if (response.create.authorId) {
                _decorateExistingUser(response, callback);
            } else {
                _decorateAnonymousUser(response, callback);
            }
        }
    }
};