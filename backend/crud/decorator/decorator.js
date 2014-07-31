'use strict';

var array = require('../../array');

module.exports = {

    inDecorator: function (collectionId, requestType, response, callback) {
        this._decorate(collectionId, requestType, 'in', response, callback);
    },

    outDecorator: function (collectionId, requestType, response, callback) {
        this._decorate(collectionId, requestType, 'out', response, callback);
    },

    _decorate: function (collectionId, requestType, decoratorType, response, callback) {
        try {
            var decoratorFn = require('./' + collectionId)[requestType][decoratorType];
            if(array.isArray(response)) {
                this._decorateMultipleResponse(decoratorFn, response, callback);
            } else {
                this._decorateSingleResponse(decoratorFn, response, callback);
            }
        } catch (ex) {
            callback(response);
        }
    },

    _decorateMultipleResponse: function(decoratorFn, response, callback) {
        var pendingInstances = response.length;
        response.forEach(function(responseItem) {
            this._decorateSingleResponse(decoratorFn, responseItem, function(decoratedResponse) {
                pendingInstances--;
                response[pendingInstances] = decoratedResponse;
                if(!pendingInstances) {
                    callback(response);
                }
            });
        });
    },

    _decorateSingleResponse: function(decoratorFn, response, callback) {
        decoratorFn(response, function (decoratedResponse) {
            callback(decoratedResponse);
        });
    }
};