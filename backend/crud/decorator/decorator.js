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
                this._decorateMultipleResponse(decoratorFn, data, callback);
            } else {
                this._decorateSingleResponse(decoratorFn, data, callback);
            }
        } catch (ex) {
            callback(data || {});
        }
    },

    _decorateMultipleResponse: function(decoratorFn, response, callback) {
        var pendingInstances = response.length;
        if(response.length) {
            response.forEach(function(responseItem) {
                this._decorateSingleResponse(decoratorFn, responseItem, function(decoratedResponse) {
                    pendingInstances--;
                    response[pendingInstances] = decoratedResponse;
                    if(!pendingInstances) {
                        callback(response);
                    }
                });
            });
        } else {
            callback(response);
        }
    },

    _decorateSingleResponse: function(decoratorFn, response, callback) {
        decoratorFn(response, function (decoratedResponse) {
            callback(decoratedResponse);
        });
    }
};