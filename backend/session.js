'use strict';

var bcrypt = require('bcrypt-nodejs'),
    read = require('./crud/read');

module.exports = {

    login: function (userName, password, session, callback) {
        var dbUser, filter = { $and: [
            { userName: userName }
        ]};
        read.find('users', filter, function (result) {
            dbUser = result[0];
            if (dbUser && bcrypt.compareSync(password, dbUser.password)) {
                delete dbUser.password;
                session.user = dbUser;
                callback(dbUser);
            } else {
                callback(undefined);
            }
        });
    },

    getUserSession: function (session, callback) {
        callback(session.user);
    },

    logout: function (session, callback) {
        if (session) {
            session.destroy();
        }
        callback();
    }
};