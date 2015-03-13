'use strict';

var email = require('emailjs'),
    fs = require("fs"),
    session = require('./session'),
    create = require('./crud/create'),
    read = require('./crud/read');

function getServer(user, password, host) {
    return email.server.connect({
        user: user,
        password: password,
        host: host,
        ssl: true
    });
}

function sendEmail(emailSetup, server, callback) {
    server.send(emailSetup, function (err, message) {
        callback(err, message);
    });
}

function getEmailSetup(from, to, subject, text) {
    return {
        from: from,
        to: to,
        subject: subject,
        text: text,
        attachment: [
            {data: text, alternative: true}
        ]
    };
}

function getFormattedSubject(subject) {
    return '[ Contact request ] ' + subject;
}

function getFormattedText(from, text) {
    return '<a href="mailto:' + from + '">' + from + '</a> says:<br/><br/><em>' + text + '</em>';
}

function setupAndSendEmail(from, to, subject, text, callback) {
    read.findOne(null, 'settings', function (response) {
        var fromSetup = response.email.from,
            finalFrom = from || fromSetup.user,
            finalTo = to || response.email.to,
            server = getServer(fromSetup.user, fromSetup.password, fromSetup.host),
            emailSetup = getEmailSetup(finalFrom, finalTo, subject, text);
        sendEmail(emailSetup, server, callback);
    });
}

function contact(req, callback) {
    var contactInfo = req.body,
        email = contactInfo.email,
        subject = getFormattedSubject(contactInfo.subject),
        text = getFormattedText(contactInfo.email, contactInfo.text);
    setupAndSendEmail(email, null, subject, text, callback);
}

function getInterpolatedTemplate(buffer, userId, tenantName) {
    var text = buffer.toString('utf8'),
    templateModel = {
        tenant: tenantName,
        userId: userId
    };
    Object.keys(templateModel).forEach(function (key) {
        text = text.replace(new RegExp('{{' + key + '}}', 'i'), templateModel[key]);
    });
    return text;
}

function createUser(req, email, callback) {
    var tenantId = session.getSession(req).tenant._id,
        body = {
            email: email,
            role: 0,
            tenantId: tenantId
        };
    create.create('users', body, req.session, function (response) {
        callback(response);
    });
}

function setupAndSendInterpolatedEmail(req, newUserId, email, templateBuffer, callback) {
    var userId = newUserId,
        tenantName =  session.getSession(req).tenant.name,
        subject = 'You have been invited to join menzit',
        interpolatedText = getInterpolatedTemplate(templateBuffer, userId, tenantName);
    setupAndSendEmail(null, email, subject, interpolatedText, callback);
}

function invite(req, callback) {
    var usersList = req.body.usersList, counter = 0;
    fs.readFile(__dirname + '/mailTemplates/invite.html', function (err, buffer) {
        usersList.forEach(function (email) {
            createUser(req, email, function (newUser) {
                setupAndSendInterpolatedEmail(req, newUser._id, email, buffer, function () {
                    if (++counter === usersList.length) {
                        callback();
                    }
                });
            });
        });
    });
}

module.exports = {
    contact: contact,
    invite: invite
};