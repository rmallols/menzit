'use strict';

var email = require('email'),
    server  = email.server.connect({
      user:    "username",
      password:"password",
      host:    "smtp.your-email.com",
      ssl:     true
});

function contact(req) {
    server.send({
      text:    "i hope this works",
      from:    "you <username@your-email.com>",
      to:      "someone <someone@your-email.com>, another <another@your-email.com>",
      cc:      "else <else@your-email.com>",
      subject: "testing emailjs"
    }, function(err, message) {
      console.log(err || message);
    });
}

module.exports = {
  contact: contact
};