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

    isLoggedUser: function (session, callback) {
        callback(session.user);
    },

    isSuperAdminUser: function(session, callback) {
        callback(session.user.role === 2);
    },

    isAdminUser: function(session, callback) {
        callback(session.user.role === 1);
    },

    isPlainUser: function(session, callback) {
        callback(!this.isSuperAdminUser && !this.isAdminUser);
    },

    logout: function (session, callback) {
        if (session) {
            session.destroy();
        }
        callback();
    }
};