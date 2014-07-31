'use strict';

module.exports = {

    post: {
        out: function(params, response, callback) {
            console.log('TESTS POST OUT DECORATOR', params);
            callback(response);
        }
    }
};