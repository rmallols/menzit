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
    communication = require('./communication'),
    decorator = require('./crud/decorator/decorator');


app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({ secret: "ch0pSuey" }));
app.use(express.static(__dirname + '/../frontend'));
app.use(app.router);

var acceptedRoutes = [
        '/', '/home', '/how-it-works', '/contact',
        '/test', '/categories', '/categories/:categoryId/test'],
    acceptedLoggedRoutes = [
        '/review', '/review/:questionId',
        '/admin/tenants', '/admin/tenants/add', '/admin/tenants/edit/:tenantId',
        '/admin/categories', '/admin/categories/add', '/admin/categories/edit/:categoryId',
        '/admin/categories/:categoryId/tests', '/admin/categories/:categoryId/tests/add',
        '/admin/categories/:categoryId/tests/edit/:testId',
        '/admin/users', '/admin/users/add', '/admin/users/edit/:userId', '/admin/users/edit/:userId/current'];

app.get('/', function (req, res) {
    res.redirect('/home');
});

app.get(acceptedRoutes, function (req, res) {
    goToIndex(res);
});

app.get('/admin/tenants/', function (req, res) {
    if (session.isSuperAdminUser(req)) {
        goToIndex(res);
    } else {
        res.redirect('/categories');
    }
    goToIndex(res);
});

app.get(acceptedLoggedRoutes, function (req, res) {
    //if (session.isLoggedUser(req)) {
        goToIndex(res);
    //} else {
    //    res.send('You don\'t have privileges to acces to this page, go to <a href="/">index</a>', 200);
    //}
});

app.post('/rest/login', function (req, res) {
    session.login(req.body.userName, req.body.password, req, function (user) {
        res.send(user);
    });
});

app.post('/rest/logout', function (req, res) {
    session.logout(req, function () {
        res.send({});
    });
});

app.get('/rest/session', function (req, res) {
    res.send(session.isLoggedUser(req));
});

app.get('/rest/tests/:testId/isCorrect/:answerId', function (req, res) {
    read.findOne(req.params.testId, 'tests', function (response) {
        res.send({ isCorrect: response.answers[req.params.answerId].isCorrect === true });
    });
});

app.get('/rest/incorrectAnswers/first', function (req, res) {
    var collectionId = 'incorrectAnswers';
    decorator.inDecorator(collectionId, 'get', req, function (filter) {
        read.find(collectionId, filter, function (response) {
            decorator.outDecorator(collectionId, 'get', response, function (decoratedResponse) {
                res.send(decoratedResponse[0]);
            });
        });
    });
});

app.post('/rest/incorrectAnswers/:questionId', function (req, res) {
    var filter, collectionId, userSession;
    userSession = session.getSession(req);
    if(userSession) {
        filter = { query: {
            'questionId': req.params.questionId,
            'create.authorId': userSession._id
        }};
        collectionId = 'incorrectAnswers';
        read.find(collectionId, filter, function (response) {
            var incorrectAnswerCollection = response.length && response[0];
            if(incorrectAnswerCollection) {
                incorrectAnswerCollection.totalIncorrectAnswers++;
                update.update(incorrectAnswerCollection._id, collectionId, incorrectAnswerCollection, req.session, function (response) {
                    res.send(response);
                });
            } else {
                incorrectAnswerCollection = {
                    questionId: req.params.questionId,
                    totalIncorrectAnswers: 1
                };
                create.create(collectionId, incorrectAnswerCollection, req.session, function (response) {
                    res.send(response);
                });
            }
        });
    }
});

app.post('/rest/incorrectAnswers/:questionId/addCorrect', function (req, res) {
    var filter, collectionId, userSession;
    userSession = session.getSession(req);
    if(userSession) {
        filter = { query: {
            'questionId': req.params.questionId,
            'create.authorId': userSession._id
        }};
        collectionId = 'incorrectAnswers';
        read.find(collectionId, filter, function (response) {
            var incorrectAnswerCollection = response.length && response[0];
            if(incorrectAnswerCollection.totalIncorrectAnswers) {
                incorrectAnswerCollection.totalIncorrectAnswers--;
                update.update(incorrectAnswerCollection._id, collectionId, incorrectAnswerCollection, req.session, function (response) {
                    res.send(response);
                });
            } else {
                incorrectAnswerCollection = {
                    questionId: req.params.questionId,
                    totalIncorrectAnswers: 1
                };
                remove.remove(incorrectAnswerCollection._id, collectionId, function (response) {
                    res.send(response);
                });
            }
        });
    }
});

app.get('/admin', function (req, res) {
    res.redirect('/admin/tenants');
});

app.post('/rest/contact', function (req, res) {
    communication.contact(req, function () {
        res.send({});
    });
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
    decorator.inDecorator(collectionId, 'post', req, function (req) {
        create.create(collectionId, req.body, req.session, function (response) {
            decorator.outDecorator(collectionId, 'post', response, function (decoratedResponse) {
                res.send(decoratedResponse);
            });
        });
    });
});

app.put('/rest/:collectionId/:documentId', function (req, res) {
    var collectionId = req.params.collectionId;
    decorator.inDecorator(collectionId, 'put', req, function (req) {
        update.update(req.params.documentId, collectionId, req.body, req.session, function (response) {
            decorator.outDecorator(collectionId, 'put', response, function (decoratedResponse) {
                res.send(decoratedResponse);
            });
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