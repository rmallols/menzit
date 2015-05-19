'use strict';

var read = require('../read'),
    session = require('../../session');

module.exports = {

    get: {

        filter: function (request, callback) {
            var filter, now, today;
            now = new Date();
            today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            filter = {
                query: {},
                sort: { totalIncorrectAnswers: -1 }
            };
            callback(filter);
        },

        response: function (response, callback) {
            read.findOne(response.questionId, 'tests', function (question) {
                response.question = question;
                delete response.questionId;
                callback(response);
            });
        }
    }
};