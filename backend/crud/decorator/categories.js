'use strict';

module.exports = {

    get: {
        out: function(params, response, callback) {
            console.log('CATEGORIES OUT DECORATOR', params);
            callback(response);
        }
    }
};