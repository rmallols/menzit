'use strict';

var mongoDb = require('mongodb'),
    pkg     = require('../package.json');

module.exports = {

    _dbId: 'menzit',

    find: function(collection, options, callback) {
        var options = this._getNormalizeFindOptions(options);
        this._connect(this._dbId, function(err, db) {
            db.collection(collection)
                .find(options.query, options.projection)
                .sort(options.sort)
                .skip(options.skip)
                .limit(options.pageSize, function (err, documents) {
                    documents.toArray(function(err, documents) {
                        callback(documents);
                    });
                });
        });
    },

    findOne: function(collection, options, callback) {
        var options = this._getNormalizeFindOptions(options);
        this._connect(this._dbId, function(err, db) {
            db.collection(collection)
                .findOne(options.query, options.projection, function (err, documents) {
                    callback(documents);
                });
        });
    },

    update : function (collection, id, data, callback) {
        var self = this;
        this._connect(this._dbId, function(err, db) {
            db.collection(collection).update(   {_id: self.getNormalizedId(id)},
                                                {$set: self._getNormalizedModel(data)},
                                                function() {
                                                    callback({});
                                            });
        });
    },

    getNormalizedId: function (_id) {
        return new mongoDb.ObjectID(_id);
    },

    _connect: function(dbId, callback) {
        var mongoDbService  = mongoDb.MongoClient,
            connectionUrl = this._getConnectionUrl(dbId);
        mongoDbService.connect(connectionUrl, function(err, db) {
            callback(err, db);
        });
    },

    _getConnectionUrl: function(dbId) {
        var host = pkg.dbHost,
            port = pkg.dbPort,
            user = pkg.dbUser,
            password = pkg.dbPassword,
            credentials = (user && password) ? user + ':' + password + '@': '',
            endpoint = host + ':' + port + '/' + dbId;
        return 'mongodb://' + credentials + endpoint;
    },

    _getNormalizeFindOptions: function(options) {
        if(!options.query)      { options.query = {}; }
        if(!options.projection) { options.projection = {}; }
        if(!options.sort)       { options.sort = {}; }
        if(!options.pageSize)   { options.pageSize = 10; }
        if(!options.skip)       { options.skip = 0; }
        return options;
    },

    _getNormalizedModel: function (model) {
        var key, updatedModel = {};
        for (key in model) {
            if (key !== '_id') {
                updatedModel[key] = model[key];
            }
        }
        return updatedModel;
    }
}