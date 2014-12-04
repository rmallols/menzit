'use strict';

var bcrypt = require('bcrypt-nodejs'),
    read = require('./crud/read');

module.exports = {

    login: function (userName, password, session, callback) {
        var dbUser, filter = { query: { $and: [
            { userName: userName }
        ]}};
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

    isLoggedUser: function (session) {
        return session.user;
    },

    isSuperAdminUser: function (session) {
        return session.user.role === 2;
    },

    isAdminUser: function (session) {
        return session.user.role === 1;
    },

    isPlainUser: function (session) {
        return this.isLoggedUser(session) &&
            !this.isSuperAdminUser(session) &&
            !this.isAdminUser(session);
    },

    hasAdminRole: function (session) {
        return this.isSuperAdminUser(session) || this.isAdminUser(session);
    },

    logout: function (session, callback) {
        if (session) {
            session.destroy();
        }
        callback();
    }
};