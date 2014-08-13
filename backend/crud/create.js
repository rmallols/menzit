'use strict';

var db = require('../db'),
    array = require('../array');

module.exports = {

    create: function (collectionId, data, session, callback) {
        if (array.isArray(data)) {
            this._createMultipleDocuments(collectionId, data, [], data.length, session, function (result) {
                callback(result);
            });
        } else {
            this._createSingleDocument(collectionId, data, session, function (result) {
                callback(result);
            });
        }
    },

    _createSingleDocument: function (collectionId, document, session, callback) {
        this._addCreateSignature(document, session);
        db.connect(function (err, dbCon) {
            dbCon.collection(collectionId).save(document, function (err, newContent) {
                callback(newContent);
            });
        });
    },

    _createMultipleDocuments: function (collectionId, documents, result, total, session, callback) {
        var self = this;
        var document = documents.pop();
        this._addCreateSignature(document, session);
        self._createSingleDocument(collectionId, documents, function (newItem) {
            result.push(newItem);
            if (--total) {
                self._createMultipleDocuments(collectionId, documents, result, total, callback);
            }
            else {  //At this point, all the documents have been saved
                callback(result);
            }
        });
    },

    _addCreateSignature: function (data, session) {
        db.addSignature('create', data, session);
    }
};