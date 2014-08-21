'use strict';

var express = require('express'),
    fs = require('fs'),
    app = express(),
    server = require('http').createServer(app),
    create = require('./crud/create'),
    read = require('./crud/read'),
    update = require('./crud/update'),
    remove = require('./crud/delete'),
    session = require('./session'),
    decorator = require('./crud/decorator/decorator');


app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({ secret: "ch0pSuey" }));
app.use(express.static(__dirname + '/../frontend'));
app.use(app.router);

var acceptedRoutes = ['/', '/home', '/test', '/categories', '/categories/:categoryId/test'],
    acceptedAdminRoutes = [
        '/admin/tenant',
        '/admin/categories', '/admin/categories/add', '/admin/categories/edit/:categoryId',
        '/admin/categories/:categoryId/tests', '/admin/categories/:categoryId/tests/add', '/admin/categories/:categoryId/tests/edit/:testId',
        '/admin/users', '/admin/users/add', '/admin/users/edit/:userId'];

app.get('/', function (req, res) {
    res.redirect('/home');
});

app.get(acceptedRoutes, function (req, res) {
    goToIndex(res);
});

app.get(acceptedAdminRoutes, function (req, res) {
    session.getUserSession(req.session, function (userSession) {
        if(userSession) {
            goToIndex(res);
        } else {
            res.send('You don\'t have privileges to acces to this page, go to <a href="/">index</a>', 200);
        }
    });
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
    session.getUserSession(req.session, function (userSession) {
        res.send(userSession);
    });
});

app.get('/admin', function (req, res) {
    res.redirect('/admin/tenant');
});

/* CRUD HANDLING */
app.get('/rest/:collectionId', function (req, res) {
    var collectionId = req.params.collectionId;
    decorator.inDecorator(collectionId, 'get', req, function (query) {
        read.find(collectionId, query, function (response) {
            decorator.outDecorator(collectionId, 'get', response, function (decoratedResponse) {
                res.send(decoratedResponse);
            });
        });
    });
});

app.get('/rest/:collectionId/:documentId', function (req, res) {
    var collectionId = req.params.collectionId;
    read.findOne(req.params.documentId, collectionId, function (response) {
        decorator.outDecorator(collectionId, 'get', response, function (decoratedResponse) {
            res.send(decoratedResponse);
        });
    });
});

app.post('/rest/:collectionId', function (req, res) {
    var collectionId = req.params.collectionId;
    create.create(collectionId, req.body, req.session, function (response) {
        decorator.outDecorator(collectionId, 'post', response, function (decoratedResponse) {
            res.send(decoratedResponse);
        });
    });
});

app.put('/rest/:collectionId/:documentId', function (req, res) {
    var collectionId = req.params.collectionId;
    update.update(req.params.documentId, collectionId, req.body, req.session, function (response) {
        decorator.outDecorator(collectionId, 'put', response, function (decoratedResponse) {
            res.send(decoratedResponse);
        });
    });
});

app.delete('/rest/:collectionId/:documentId', function (req, res) {
    var collectionId = req.params.collectionId;
    remove.remove(req.params.documentId, collectionId, function (response) {
        decorator.outDecorator(collectionId, 'delete', response, function (decoratedResponse) {
            res.send(decoratedResponse);
        });
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