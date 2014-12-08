'use strict';

var array = require('../../array');

module.exports = {

    inDecorator: function (collectionId, requestType, request, callback) {
        this._decorate(collectionId, requestType, 'filter', request, callback);
    },

    outDecorator: function (collectionId, requestType, response, callback) {
        this._decorate(collectionId, requestType, 'response', response, callback);
    },

    _decorate: function (collectionId, requestType, decoratorType, data, callback) {
        var decoratorFn = null;
        try {
            decoratorFn = require('./' + collectionId)[requestType][decoratorType];
            if (decoratorFn) {
                this._decorateSuccess(collectionId, decoratorFn, requestType, decoratorType, data, callback);
            } else {
                this._decorateError(data, null, callback);
            }
        } catch (ex) {
            console.info('[INFO] Unable to find the decorator', ex);
            this._decorateError(data, (decoratorFn) ? ex : null, callback);
        }
    },

    _decorateSuccess: function (collectionId, decoratorFn, requestType, decoratorType, data, callback) {
        if (decoratorFn && array.isArray(data)) {
            this._decorateMultipleObject(decoratorFn, data, callback);
        } else {
            this._decorateSingleObject(decoratorFn, data, callback);
        }
    },

    _decorateError: function (data, ex, callback) {
        if (ex) {
            if (ex.code === 'MODULE_NOT_FOUND') {
                callback(data || {});
            }
            else {
                throw new Error(ex);
            }
        } else {
            callback(data || {});
        }
    },

    _decorateMultipleObject: function (decoratorFn, data, callback) {
        if (data.length) {
            this._decorateExistingMultipleObject(decoratorFn, data, callback);
        } else {
            callback(data);
        }
    },

    _decorateSingleObject: function (decoratorFn, data, callback) {
        decoratorFn(data, function (decoratedData) {
            callback(decoratedData);
        });
    },

    _decorateExistingMultipleObject: function (decoratorFn, data, callback) {
        var self = this, processedItems = 0, totalItems = data.length;
        data.forEach(function (responseItem, index) {
            self._decorateSingleObject(decoratorFn, responseItem, function (decoratedData) {
                data[index] = decoratedData;
                processedItems++;
                if (processedItems === totalItems) {
                    callback(data);
                }
            });
        });
    }
};