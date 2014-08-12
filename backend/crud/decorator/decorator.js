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
        try {
            var decoratorFn = require('./' + collectionId)[requestType][decoratorType];
            if(array.isArray(data)) {
                this._decorateMultipleObject(decoratorFn, data, callback);
            } else {
                this._decorateSingleObject(decoratorFn, data, callback);
            }
        } catch (ex) {
            callback(data || {});
        }
    },

    _decorateMultipleObject: function(decoratorFn, data, callback) {
        var pendingInstances = data.length, self = this;
        if(data.length) {
            data.forEach(function(responseItem) {
                self._decorateSingleObject(decoratorFn, responseItem, function(decoratedData) {
                    pendingInstances--;
                    data[pendingInstances] = decoratedData;
                    if(!pendingInstances) {
                        callback(data);
                    }
                });
            });
        } else {
            callback(data);
        }
    },

    _decorateSingleObject: function(decoratorFn, data, callback) {
        decoratorFn(data, function (decoratedData) {
            callback(decoratedData);
        });
    }
};