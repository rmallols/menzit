'use strict';

app.directive('upload', ['$q', '$timeout', 'http', function ($q, $timeout, http) {
    return  {
        replace: true,
        templateUrl: 'upload.html',
        scope: {
            media: '=ngModel',
            onSubmitRequest: '='
        },
        link: function link(scope, element) {

            var inputElement = angular.element('input[type="file"]', element);
            refreshToken();
            if(!scope.media) {
                scope.media = {};
            }
            inputElement.bind('change', handleFileSelect);

            function handleFileSelect(evt) {
                var reader, file = evt.target.files[0];
                if (file.type.match('image.*')) {
                    reader = new FileReader();
                    reader.onload = (function () {
                        return function (e) {
                            scope.toBeUpdated = true;
                            scope.toBeDeleted = false;
                            scope.base64 = e.target.result;
                            scope.$apply();
                        };
                    })();
                    reader.readAsDataURL(file);
                }
            }

            function getSubmitHeaders() {
                return {
                    transformRequest: angular.identity,
                    headers: { 'Content-Type': undefined }
                };
            }

            function submit(uploadUrl, fileDescriptor) {
                var deferred = $q.defer();
                cUDSubit(uploadUrl, fileDescriptor).then(function (media) {
                    onSubmitSuccess(media, deferred);
                }).catch(function () {
                    onSubmitError(deferred);
                });
                return deferred.promise;
            }

            function cUDSubit(uploadUrl, fileDescriptor) {
                if(!scope.media._id && fileDescriptor && !scope.toBeDeleted) { //The media doesn't exist yet
                    return http.post(uploadUrl, fileDescriptor, getSubmitHeaders());
                } else if(scope.media._id) { //The media already exists
                    return cUDSubitExistingMedia(uploadUrl, fileDescriptor);
                } else { //Nothing has been actually changed
                    return $q.when([scope.media]);
                }
            }

            function cUDSubitExistingMedia(uploadUrl, fileDescriptor) {
                if(scope.toBeDeleted) { //The existing media has been marked to be removed
                    return http.delete(uploadUrl);
                } else if(scope.toBeUpdated) { //The existing media has been marked to be updated
                    return http.put(uploadUrl, fileDescriptor, getSubmitHeaders());
                } else { //Nothing has been actually changed
                    return $q.when([scope.media]);
                }
            }

            function onSubmitSuccess(media, deferred) {
                refreshToken();
                scope.media._id = (media && media[0]) ? media[0]._id : undefined;
                $timeout(function () { //TODO: issue #9
                    deferred.resolve(media);
                }, 1000);
            }

            function onSubmitError(deferred) {
                deferred.reject();
            }

            function refreshToken() {
                scope.refreshToken = Math.floor(Math.random() * 10000);
            }

            scope.onSubmitRequest = function () {
                var file = scope.selectedFile,
                    uploadUrl = '/rest/media/' + (scope.media._id || ''),
                fileDescriptor = new FormData();
                fileDescriptor.append('file', file);
                return submit(uploadUrl, (file) ? fileDescriptor : null);
            };

            scope.remove = function () {
                scope.toBeDeleted = true;
                scope.toBeUpdated = false;
                inputElement.val('');
            };
        }
    };
}]);