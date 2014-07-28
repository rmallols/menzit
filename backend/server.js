'use strict';

var express = require('express'),
    fs = require('fs'),
    app = express(),
    server = require('http').createServer(app),
    create = require('./crud/create'),
    read = require('./crud/read'),
    update = require('./crud/update'),
    remove = require('./crud/delete'),
    session = require('./session');

app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({ secret: "ch0pSuey" }));
app.use(express.static(__dirname + '/../frontend'));
app.use(app.router);

var acceptedRoutes = ['/', '/test', '/categories', '/categories/:categoryId/runTest',
    '/admin/tenant', '/admin/categories', '/admin/categories/add',
    '/admin/categories/edit/:categoryId', '/admin/users'];

app.get(acceptedRoutes, function (req, res) {
    goToIndex(res);
});

app.post('/rest/login', function (req, res) {
    session.login(req.body.user, req.body.password, req.session, function (user) {
        res.send(user);
    });
});

app.post('/rest/logout', function (req, res) {
    session.logout(req.session, function () {
        res.send({});
    });
});

app.get('/rest/session', function (req, res) {
    session.getSession(req.session, function (user) {
        res.send(user);
    });
});

app.get('/admin', function (req, res) {
    res.redirect('/admin/tenant');
});

/* CRUD HANDLING */
app.get('/rest/:collectionId', function (req, res) {
    read.find(req.params.collectionId, {}, function (response) {
        res.send(response);
    });
});

app.get('/rest/:collectionId/:documentId', function (req, res) {
    read.findOne(req.params.documentId, req.params.collectionId, function (response) {
        res.send(response);
    });
});

app.post('/rest/:collectionId', function (req, res) {
    create.create(req.params.collectionId, req.body, req.session, function (response) {
        res.send(response);
    });
});

app.put('/rest/:collectionId/:documentId', function (req, res) {
    update.update(req.params.documentId, req.params.collectionId, req.body, req.session, function (response) {
        res.send(response);
    });
});

app.delete('/rest/:collectionId/:documentId', function (req, res) {
    remove.remove(req.params.documentId, req.params.collectionId, function (response) {
        res.send(response);
    });
});
/* END CRUD HANDLING */

app.get('*', function (req, res) {
    res.send('Page not found, go to <a href="/">index</a>', 404);
});

var port = process.env.PORT || 3000;
server.listen(port, function () {
    console.log("listening on " + port);
});

function goToIndex(res) {
    res.send(fs.readFileSync(__dirname + '/../frontend/src/index.html').toString());
}