'use strict';

var express = require('express'),
    fs      = require('fs'),
    app     = express(),
    server  = require('http').createServer(app),
    db      = require('./db'),
    session = require('./session');

app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({ secret: "ch0pSuey" }));

app.get(['/', '/test', '/categories', '/categories/:categoryId/runTest'],
function (req, res) {
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

app.get('/rest/getSession', function (req, res) {
    session.getSession(req.session, function (user) {
        res.send(user);
    });
});

app.get('/rest/categories', function (req, res) {
    db.find('categories', {}, function (response) {
        res.send(response);
    });
});

app.get('/rest/categories/:categoryId', function (req, res) {
    var query = { _id: db.getNormalizedId(req.params.categoryId) };
    db.findOne('categories', { query: query }, function (response) {
        res.send(response);
    });
});

app.get('/rest/questions/:questionId', function (req, res) {
    var query = { _id: db.getNormalizedId(req.params.questionId) };
    db.findOne('questions', { query: query }, function (response) {
        res.send(response);
    });
});

app.use(express.static(__dirname + '/../frontend'));

var port = process.env.PORT || 3000;
server.listen(port, function() {
    console.log("listening on " + port);
});

function goToIndex(res) {
    res.send(fs.readFileSync(__dirname + '/../frontend/src/index.html').toString());
}