'use strict';

var bcrypt = require('bcrypt-nodejs');

function hashPassword(request, callback) {
    if(request.body.password) {
        request.body.password = bcrypt.hashSync(request.body.password);
    }
    callback(request);
}

module.exports = {

    get: {
        response: function (response, callback) {
            delete response.password;
            callback(response);
        }
    },

    post: {
        filter: hashPassword
    },

    put: {
        filter: hashPassword
    }
};