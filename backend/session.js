'use strict';

var bcrypt = require('bcrypt-nodejs'),
    read = require('./crud/read');

module.exports = {

    login: function (userName, password, request, callback) {
        var dbUser, filter = { query: { $and: [
            { userName: userName }
        ]}};
        read.find('users', filter, function (users) {
            dbUser = users[0];
            if (dbUser && bcrypt.compareSync(password, dbUser.password)) {
                delete dbUser.password;
                request.session.user = dbUser;
                if(request.session.user.tenantId) {
                    read.findOne(dbUser.tenantId, 'tenants', function (tenant) {
                        delete request.session.user.tenantId;
                        request.session.user.tenant = tenant;
                        callback(dbUser);
                    });
                } else {
                    callback(dbUser);
                }
            } else {
                callback(undefined);
            }
        });
    },

    getSession: function (request) {
        return (request.session) ? request.session.user : null;
    },

    isLoggedUser: function (request) {
        return request.session && request.session.user;
    },

    isSuperAdminUser: function (request) {
        return this.isLoggedUser(request) && request.session.user.role === 2;
    },

    isAdminUser: function (request) {
        return this.isLoggedUser(request) && request.session.user.role === 1;
    },

    isPlainUser: function (request) {
        return this.isLoggedUser(request) &&
            !this.isSuperAdminUser(request) &&
            !this.isAdminUser(request);
    },

    hasAdminRole: function (request) {
        return this.isSuperAdminUser(request) || this.isAdminUser(request);
    },

    logout: function (request, callback) {
        if (request.session) {
            request.session.destroy();
        }
        callback();
    }
};