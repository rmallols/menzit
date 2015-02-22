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
        text:       text,
        from:       from,
        to:         to.title + ' <' + to.email + '>',
        subject:    subject
    };
}

function contact(req, callback) {
    read.findOne(null, 'settings', function (response) {
        var fromSetup = response.email.from,
            toSetup = response.email.to,
            server  = getServer(fromSetup.user, fromSetup.password, fromSetup.host),
            contact = req.body,
            contactSetup = getContactSetup(contact.email, toSetup, contact.subject, contact.text);
        sendEmail(contactSetup, server, callback);
    });
}

module.exports = {
  contact: contact
};