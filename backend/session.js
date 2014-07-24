'use strict';

var bcrypt = require('bcrypt-nodejs'),
    db = require('./db');

module.exports = {

    login: function (userName, password, session, callback) {
        var filter = { $and: [{ userName: userName }]};
        db.findOne('users', filter, function (dbUser) {
            if (dbUser && bcrypt.compareSync(password, dbUser.password)) {
                delete dbUser.password;
                session.user = dbUser;
                callback(dbUser);
            } else {
                callback(undefined);
            }
        });
    },

    getSession: function(session, callback) {
        callback(session.user);
    },

    logout: function (session, callback) {
        if (session) {
            session.destroy();
        }
        callback();
    }
};