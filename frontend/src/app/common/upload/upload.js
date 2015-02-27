'use strict';

app.directive('upload', ['$q', 'http', function ($q, http) {
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
                http.post(uploadUrl, fileDescriptor, getSubmitHeaders())
                    .then(function (media) {
                        scope.base64 = null;
                        refreshToken();
                        scope.media.id = media[0]._id;
                        deferred.resolve(media);
                    }).catch(function () {
                        deferred.reject();
                    });
                return deferred.promise;
            }

            function refreshToken() {
                scope.refreshToken = Math.floor(Math.random() * 10000);
            }

            scope.onSubmitRequest = function () {
                var file = scope.selectedFile,
                    uploadUrl = '/rest/media/' + (scope.media.id || ''),
                    fileDescriptor = new FormData();
                if(file) {
                    fileDescriptor.append('file', file);
                    return submit(uploadUrl, fileDescriptor);
                } else {
                    return $q.when();
                }
            };

            scope.remove = function () {
                scope.media.id = null;
                scope.base64 = null;
                inputElement.val('');
            };
        }
    };
}]);