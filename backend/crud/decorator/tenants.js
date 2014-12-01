'use strict';

module.exports = {

    get: {
        filter: function (request, callback) {
            var filter = { query: { name: new RegExp(request.query.search, 'i') }};
            callback(filter);
        }
    }
};