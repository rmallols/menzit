'use strict';

var UAParser = require('ua-parser-js'),
    parser = new UAParser();

function isSupportedChrome(name) {
    return name === 'Chrome';
}

function isSupportedFirefox(name) {
    return name === 'Firefox';
}

function isSupportedMobileSafari(name, major) {
    return name === 'Mobile Safari' && Number(major) >= 5;
}

function isSupportedIE(name, major) {
    return name === 'IE' && Number(major) === 11;
}

module.exports = {

    isSupported: function (req) {
        var ua = req.headers['user-agent'],
            browser = parser.setUA(ua).getResult().browser,
            name = browser.name,
            major = browser.major;
        return isSupportedChrome(name) || isSupportedFirefox(name) ||
            isSupportedIE(name, major) || isSupportedMobileSafari(name, major);
    },

    getCurrentUrl: function (req) {
        return (req.headers.referer && req.headers.referer.substr(req.headers.referer.lastIndexOf('/'))) || req.url;
    }
};