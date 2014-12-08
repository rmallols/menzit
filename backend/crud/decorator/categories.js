'use strict';

var session = require('../../session'),
    db = require('../../db');

function addSearchFilter(request, filter) {
    if (request.query.search) {
        filter.query.$and.push({title: new RegExp(request.query.search, 'i')});
    }
    return filter;
}

function addTenantCategoriesFiltesr(request, filter) {
    var userSession;
    if (session.isLoggedUser(request) && !session.isSuperAdminUser(request)) {
        userSession = session.getSession(request);
        userSession.tenant.categories.forEach(function (categoryId) {
            filter.query.$and.push({_id: db.getNormalizedId(categoryId)});
        });
    }
    return filter;
}

module.exports = {
    get: {
        filter: function (request, callback) {
            var filter = {query: {$and: [{}]}};
            filter = addSearchFilter(request, filter);
            filter = addTenantCategoriesFiltesr(request, filter);
            callback(filter);
        }
    }
};