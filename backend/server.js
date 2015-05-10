'use strict';

var express = require('express'),
    fs = require('fs'),
    app = express(),
    server = require('http').createServer(app),
    http = require('http'),
    create = require('./crud/create'),
    read = require('./crud/read'),
    update = require('./crud/update'),
    remove = require('./crud/delete'),
    session = require('./session'),
    communication = require('./communication'),
    media = require('./media'),
    browser = require('./browser'),
    decorator = require('./crud/decorator/decorator');

app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({ secret: "ch0pSuey" }));
app.use(express.static(__dirname + '/../frontend'));
app.use(app.router);

function responseWithErrorControl(res, err, data) {
    if(err) {
        res.send(500, err);
    } else {
        res.send(data);
    }
}

var acceptedRoutes = [
        '/', '/home', '/how-it-works', '/contact',
        '/test', '/play', '/play/:categoryId/quiz', '/play/:categoryId/speech',
        '/page-not-found', '/browser-not-supported'],
    acceptedLoggedRoutes = [
        '/review', '/review/:questionId',
        '/admin/tenants', '/admin/tenants/add', '/admin/tenants/edit/:tenantId', '/admin/tenants/invite/:tenantId',
        '/admin/categories', '/admin/categories/add', '/admin/categories/edit/:categoryId',
        '/admin/categories/:categoryId/tests', '/admin/categories/:categoryId/tests/add',
        '/admin/categories/:categoryId/tests/speech/add', '/admin/categories/:categoryId/tests/speech/edit/:categoryId',
        '/admin/categories/:categoryId/tests/edit/:testId',
        '/admin/users', '/admin/users/add', '/admin/users/edit/:userId', '/admin/users/edit/:userId/current', '/admin/users/edit/:userId/activate'];

app.get(acceptedRoutes, function (req, res) {
    var browserNotSupportedUrl = '/browser-not-supported';
    if(browser.isSupported(req) || browser.getCurrentUrl(req) === browserNotSupportedUrl) {
        goToIndex(res);
    } else {
        res.redirect(browserNotSupportedUrl);
    }
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
    session.login(req.body.userName, req.body.password, req.body.remember, req, res, function (user) {
        res.send(user);
    });
});

app.post('/rest/logout', function (req, res) {
    session.logout(req, res, function () {
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
    communication.contact(req, function (err, data) {
        responseWithErrorControl(res, err, data);
    });
});

app.post('/rest/invite', function (req, res) {
    communication.invite(req, function (err, data) {
        responseWithErrorControl(res, err, data);
    });
});

app.post('/rest/media', function (req, res) {
    media.create(req.files, req.session, function (err, data) {
        responseWithErrorControl(res, err, data);
    });
});

app.put('/rest/media/:mediaId', function (req, res) {
    media.update(req.params.mediaId, req.files, req.session, function (err, data) {
        responseWithErrorControl(res, err, data);
    });
});

app.get('/media/:documentId', function (req, res) {
    read.findOne(req.params.documentId, 'media', function (content) {
        if(content) {
            //Try to get the file name from the URL in order to keep the document name once it's going to be downloaded
            // Otherwise, take it from database
            var filename = req.params.name || content.name, buffer;
            //noinspection JSUnresolvedFunction
            res.attachment(filename);
            res.header("Content-Type", content.mime);
            //noinspection JSUnresolvedFunction,JSCheckFunctionSignatures
            buffer = new Buffer(content.data.toString('base64'), "base64");
            res.end(buffer, 'base64');
        } else {
            res.end(null);
        }
    });
});

app.get('/rest/audio/:documentId', function (req, res) {
    read.findOne(req.params.documentId, 'media', function (content) {
        if(content) {
            res.send(content);
        } else {
            res.send(null);
        }
    });
});

app.post('/rest/audio', function (req, res) {
    media.create(req.body, req.session, function (err, data) {
        responseWithErrorControl(res, err, data);
    });
});

app.put('/rest/audio/:mediaId', function (req, res) {
    media.update(req.params.mediaId, req.body, req.session, function (err, data) {
        responseWithErrorControl(res, err, data);
    });
});

app.delete('/rest/audio/:mediaId', function (req, res) {
    remove.remove(req.params.mediaId, 'media', function (data) {
        responseWithErrorControl(res, null, data);
    });
});

app.get('/rest/external-audio', function (req, res) {
    http.get('http://tts-api.com/tts.mp3?q=' + req.query.q, function(resp1){
        http.get(resp1.headers.location, function (resp2) {
            var chunks = [];
            resp2.on('data', function(chunk){
                chunks.push(chunk);
            });
            resp2.on('end', function() {
                var body = Buffer.concat(chunks);
                res.send({ data: 'data:audio/wav;base64,' + body.toString('base64')});
            });
        });
    }).on("error", function(e){
        //console.log("Got error: " + e.message);
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
    res.redirect('/page-not-found');
});

var port = process.env.PORT || 3000;
server.listen(port, function () {
    console.log("listening on " + port);
});

function goToIndex(res) {
    res.send(fs.readFileSync(__dirname + '/../frontend/src/index.html').toString());
}