'use strict';

var db = require('../db');

module.exports = {

    update: function (documentId, collectionId, data, session, callback) {
        var self = this;
        this._addUpdateSignature(data, session);
        db.connect(function (err, dbCon) {
            dbCon.collection(collectionId).update({_id: db.getNormalizedId(documentId)},
                {$set: self._getNormalizedModel(data)},
                function () {
                    callback({});
                });
        });
    },

    _getNormalizedModel: function (model) {
        var key, updatedModel = {};
        for (key in model) {
            if (key !== '_id' && model.hasOwnProperty(key)) {
                updatedModel[key] = model[key];
            }
        }
        return updatedModel;
    },

    _addUpdateSignature : function (data, session) {
        db.addSignature('update', data, session);
    }
};