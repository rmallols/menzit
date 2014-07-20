(function() {
    'use strict';
    module.exports = {

        _dbId: 'menzit',

        find: function(collection, options, callback) {

            var options = this._normalizeFindOptions(options);

            this._connect(this._dbId, function(err, db) {
                db.collection(collection)
                    .find(options.query,options. projection)
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

            var options = this._normalizeFindOptions(options);

            this._connect(this._dbId, function(err, db) {
                db.collection(collection)
                    .findOne(options.query, options.projection, function (err, documents) {
                        callback(documents);
                    });
            });
        },

        _connect: function(dbId, callback) {

            var mongoDbService  = require('mongodb').MongoClient,
                connectionUrl = this._getConnectionUrl(dbId);

            mongoDbService.connect(connectionUrl, function(err, db) {
                callback(err, db);
            });
        },

        _getConnectionUrl: function(dbId) {

            var pkg = require('../package.json'),
                host = pkg.dbHost,
                port = pkg.dbPort,
                user = pkg.dbUser,
                password = pkg.dbPassword,
                credentials = (user && password) ? user + ':' + password + '@': '',
                endpoint = host + ':' + port + '/' + dbId;

            return 'mongodb://' + credentials + endpoint;
        },

        _normalizeFindOptions: function(options) {

            if(!options.query)      { options.query = {}; }
            if(!options.projection) { options.projection = {}; }
            if(!options.sort)       { options.sort = {}; }
            if(!options.pageSize)   { options.pageSize = 10; }
            if(!options.skip)       { options.skip = 0; }

            return options;
        }
    }
})();