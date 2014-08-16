'use strict';

var mongoDb = require('mongodb'),
    pkg = require('../package.json');

module.exports = {

    connect: function (callback) {
        var dbId = 'menzit',
            mongoDbService = mongoDb.MongoClient,
            connectionUrl = this._getConnectionUrl(dbId);
        mongoDbService.connect(connectionUrl, function (err, db) {
            callback(err, db);
        });
    },

    getNormalizedId: function (_id) {
        return new mongoDb.ObjectID(_id);
    },

    addSignature: function (event, data, session) {
        var currentDate = new Date();
        //Right now, we're skipping storing 'time' metadata because of chart / reporting incompatibility problems
        //The point is that mongoJs (v0.6.4) is not supporting the 'keyf' grouping attribute, which is necessary
        //to group sets of dates, merging them just using the 'date' metadata but avoiding the 'time' metadata
        currentDate.setHours(0, 0, 0, 0);
        data[event] = {
            date: currentDate,
            authorId: (session.user) ? session.user._id : null
        };
    },

    _getConnectionUrl: function (dbId) {
        var db = pkg.db[pkg.env],
            host = db.host,
            port = db.port,
            user = db.user,
            password = db.password,
            credentials = (user && password) ? user + ':' + password + '@' : '',
            endpoint = host + ':' + port + '/' + dbId;
        return 'mongodb://' + credentials + endpoint;
    }
};