'use strict';

app.directive('upload', [function () {
    return  {
        replace: true,
        restrict: 'A',
        templateUrl: 'upload.html',
        scope: {
            ngModel: '='
        },
        link: function link(scope, element) {

            function handleFileSelect(evt) {
                var reader, file = evt.target.files[0];
                if (file.type.match('image.*')) {
                    reader = new FileReader();
                    reader.onload = (function () {
                        return function (e) {
                            scope.ngModel = e.target.result;
                            scope.hasBeenUpload = true;
                            scope.uploadUrl = null;
                            scope.$apply();
                        };
                    })();
                    reader.readAsDataURL(file);
                }
            }

            function isUrl(string) {
                return new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/).test(string);
            }

            scope.addImage = function () {
                inputElement.click();
            };

            scope.delete = function () {
                scope.ngModel = null;
                scope.hasBeenUpload = false;
                inputElement.val('');
            };

            scope.setUploadUrl = function () {
                scope.ngModel = scope.uploadUrl;
                scope.hasBeenUpload = false;
            };

            var inputElement = angular.element('input[type="file"]', element);
            inputElement.bind('change', handleFileSelect);

            if(isUrl(scope.ngModel)) {
                scope.uploadUrl = scope.ngModel;
            } else if(scope.ngModel) {
                scope.hasBeenUpload = true;
            }
        }
    };
}]);