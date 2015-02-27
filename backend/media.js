'use strict';
var create = require("./crud/create"),
    update = require("./crud/update"),
    fs = require("fs");

function createFn (files, session, callback) {
    manageMedia(null, files, session, callback);
}

function updateFn (documentId, files, session, callback) {
    manageMedia(documentId, files, session, callback);
}

function manageMedia (documentId, files, session, callback) {
    if (typeof files.file[0] === "object") { //Multiple file
        var uploadedFiles = [], i;
        for (i = 0; i < files.file.length; i += 1) {
            uploadFile(documentId, files.file[i], session, function (uploadedFile) {
                uploadedFiles.push(uploadedFile);
                if (uploadedFiles.length === files.file.length) {
                    callback(uploadedFiles);
                }
            });
        }
    } else { //Single file
        uploadFile(documentId, files.file, session, function (err, uploadedFile) {
            callback(err, [uploadedFile]);
        });
    }
}

function uploadFile(documentId, file, session, callback) {
    readFile(file.path, function (err, data) {
        var saveObj = {
            data    : data,
            name   : file.name,
            size   : file.size,
            mime   : file.mime
        };
        if (documentId) { //Overwrite existing media
            updateExistingFile(documentId, saveObj, session, callback);
        } else { //Create new media
            createNewFile(saveObj, session, callback);
        }
    });
}

function onUploadedMedia(media, saveObj, callback) {
    saveObj._id = media._id;
    delete saveObj.data;
    callback(null, saveObj);
}

function createNewFile(saveObj, session, callback) {
    create.create('media', saveObj, session, function (newMedia) {
        onUploadedMedia(newMedia, saveObj, callback);
    });
}

function updateExistingFile(documentId, saveObj, session, callback) {
    update.update(documentId, 'media', saveObj, session, function (updatedMedia) {
        onUploadedMedia(updatedMedia, saveObj, callback);
    });
}

function readFile(filePath, callback) {
    fs.readFile(filePath, function (err, data) {
        if (callback) {
            callback(err, data);
        }
    });
}

module.exports = {
    create : createFn,
    update : updateFn
};