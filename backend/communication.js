'use strict';

var email = require('emailjs'),
    fs = require("fs"),
    read = require('./crud/read');

function getServer(user, password, host) {
    return email.server.connect({
        user:       user,
        password:   password,
        host:       host,
        ssl:        true
    });
}

function sendEmail(emailSetup, server, callback) {
    server.send(emailSetup, function(err, message) {
        callback(err, message);
    });
}

function getEmailSetup(from, to, subject, text) {
    return {
        from:       from,
        to:         to,
        subject:    subject,
        text:       text,
        attachment: [
            { data: text, alternative: true }
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
            server  = getServer(fromSetup.user, fromSetup.password, fromSetup.host),
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

function invite(req, callback) {
    var usersList = req.body.usersList,
        counter = 0,
        subject = 'You have been invited to join menzit';
        fs.readFile(__dirname + '/mailTemplates/invite.html', function (err, buffer) {
            var templateModel = {
                foo: 'bla',
                mor: 'test'
            };

            var text = buffer.toString('utf8');
            for(var key in templateModel) {
                text = text.replace( new RegExp('{{' + key  + '}}', 'i'), templateModel[key] );
            }

            usersList.forEach(function (user) {
                setupAndSendEmail(null, user, subject, text, function () {
                    counter++;
                    if(counter === usersList.length) {
                        callback();
                    }
                });
            });
        });
}

module.exports = {
    contact: contact,
    invite: invite
};