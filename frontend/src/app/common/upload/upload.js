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
                            scope.$apply();
                        };
                    })();
                    reader.readAsDataURL(file);
                }
            }

            scope.addImage = function () {
                inputElement.click();
            };

            scope.delete = function () {
                scope.ngModel = null;
                inputElement.val('');
            };

            var inputElement = angular.element('input[type="file"]', element);
            inputElement.bind('change', handleFileSelect);
        }
    };
}]);