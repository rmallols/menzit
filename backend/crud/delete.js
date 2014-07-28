'use strict';

var db = require('../db');

module.exports = {

    remove: function (documentId, collectionId, callback) {
        var query = (documentId) ? { _id: db.getNormalizedId(documentId.toString())} : {};
        db.connect(function (err, dbCon) {
            dbCon.collection(collectionId).remove(query, function () {
                callback({});
            });
        });
    }
};