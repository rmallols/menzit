'use strict';

var db = require('../db');

module.exports = {

    find: function (collectionId, data, callback) {
        var options = this._getNormalizeFindOptions(data);
        db.connect(function (err, dbCon) {
            dbCon.collection(collectionId)
                .find(options.query, options.projection)
                .sort(options.sort)
                .skip(options.skip)
                .limit(options.pageSize, function (err, documents) {
                    documents.toArray(function (err, documents) {
                        callback(documents);
                    });
                });
        });
    },

    findOne: function (documentId, collectionId, callback) {
        var query = (documentId) ? { query: { _id: db.getNormalizedId(documentId) }} : {},
            options = this._getNormalizeFindOptions(query);
        db.connect(function (err, dbCon) {
            dbCon.collection(collectionId)
                .findOne(options.query, options.projection, function (err, documents) {
                    callback(documents);
                });
        });
    },

    _getNormalizeFindOptions: function (options) {
        if (!options.query) {
            options.query = {};
        }
        if (!options.projection) {
            options.projection = {};
        }
        if (!options.sort) {
            options.sort = { 'create.date': -1 };
        }
        if (!options.pageSize) {
            options.pageSize = 0;
        }
        if (!options.skip) {
            options.skip = 0;
        }
        return options;
    }
};