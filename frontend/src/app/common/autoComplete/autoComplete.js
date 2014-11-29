'use strict';

app.directive('autoComplete', ['http', function (http) {
    return  {
        restrict: 'A',
        templateUrl: 'autoComplete.html',
        scope: {
            ngModel: '=',
            endpoint: '@',
            displayProperty: '@'
        },
        link: function link(scope) {

            scope.tags = [];
            if(scope.ngModel) {
                fillTagsInfo(scope.ngModel, scope.endpoint, scope.displayProperty);
            } else {
                scope.ngModel = [];
            }

            scope.source = function($query) {
                return http.get(scope.endpoint + '?search=' + $query);
            };

            scope.$watch('tags', function(tags) {
                scope.ngModel.length = 0;
                if(tags && tags.length) {
                    tags.forEach(function (tag) {
                        scope.ngModel.push(tag._id);
                    });
                }
            }, true);
            
            function fillTagsInfo(ngModel, endpoint, displayProperty) {
                ngModel.forEach(function(tagId, $index) {
                    http.get(endpoint + '/' + tagId).then(function(tag) {
                        scope.tags.push({_id: tagId});
                        scope.tags[$index][displayProperty] = tag[displayProperty];
                    });
                });
            }
        }
    };
}]);