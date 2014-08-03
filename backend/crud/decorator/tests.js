'use strict';

module.exports = {

    get: {
        filter: function (request, callback) {
            var filter = { query: { categoryId: request.query.categoryId }};
            callback(filter);
        }
    }
};