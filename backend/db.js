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

    create : function (collection, data, session, callback) {
        if(this._isArray(data)) {
            this._createMultipleDocuments(collection, data, [], data.length, session, function(result) {
                callback(result);
            });
        } else {
            this._createSingleDocument(collection, data, session, function(result) {
                callback(result);
            });
        }
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

    delete : function (collection, id, callback) {
        var query = (id) ? { _id: this.getNormalizedId(id.toString())} : {};
        this._connect(this._dbId, function(err, db) {
            db.collection(collection).remove(query, function () {
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

    _createSingleDocument: function (collection, document, session, callback) {
        this._addCreateSignature(document, session);
        this._connect(this._dbId, function(err, db) {
            db.collection(collection).save(document, function (err, newContent) {
                callback(err, newContent);
            });
        });
    },

    _createMultipleDocuments: function (collection, documents, result, total, session, callback) {
        var self = this;
        var document = documents.pop();
        this._addCreateSignature(document, session);
        self._createSingleDocument(collection, documents, function(newItem) {
            result.push(newItem);
            if (--total) {
                self._createMultipleDocuments(collection, documents, result, total, callback);
            }
            else {  //At this point, all the documents have been saved
                callback(result);
            }
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
    },

    _isArray: function (item) {
        return Object.prototype.toString.call( item ) === '[object Array]';
    },

    _addCreateSignature : function (body, session) {
        this._addSignature('create', body, session);
    },

    _addUpdateSignature : function (body, session) {
        this._addSignature('update', body, session);
    },

    _addSignature : function (event, body, session) {
        var currentDate = new Date();
        //Right now, we're skipping storing 'time' metadata because of chart / reporting incompatibility problems
        //The point is that mongoJs (v0.6.4) is not supporting the 'keyf' grouping attribute, which is necessary
        //to group sets of dates, merging them just using the 'date' metadata but avoiding the 'time' metadata
        currentDate.setHours(0, 0, 0, 0);
        body[event] = {
            date: currentDate,
            authorId: session._id
        };
    }
}