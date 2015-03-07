'use strict';

var email = require('emailjs'),
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

function getContactSetup(from, to, subject, text) {
    return {
        from:       from,
        to:         to.title + ' <' + to.email + '>',
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

function contact(req, callback) {
    read.findOne(null, 'settings', function (response) {
        var fromSetup = response.email.from,
            toSetup = response.email.to,
            server  = getServer(fromSetup.user, fromSetup.password, fromSetup.host),
            contact = req.body,
            subject = getFormattedSubject(contact.subject),
            text = getFormattedText(contact.email, contact.text),
            contactSetup = getContactSetup(contact.email, toSetup, subject, text);
        sendEmail(contactSetup, server, callback);
    });
}

module.exports = {
  contact: contact
};