'use strict';

module.exports = {

    get: {
        filter: function (request, callback) {
            var filter = { query: { title: new RegExp(request.query.search, 'i') }};
            callback(filter);
        }
    }
};