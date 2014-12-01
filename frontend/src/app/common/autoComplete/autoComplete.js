'use strict';

app.directive('autoComplete', ['http', function (http) {
    return  {
        restrict: 'A',
        templateUrl: 'autoComplete.html',
        scope: {
            ngModel: '=',
            endpoint: '@',
            displayProperty: '@',
            singleSelection: '='
        },
        link: function link(scope) {

            scope.tags = [];
            scope.maxTags = (scope.singleSelection) ? 1 : null;
            scope.placeholder = ' ';

            if(scope.ngModel) {
                fillTagsInfo(scope.ngModel, scope.endpoint, scope.displayProperty);
            } else {
                scope.ngModel = (scope.singleSelection) ? '' : [];
            }

            scope.source = function($query) {
                return http.get(scope.endpoint + '?search=' + $query);
            };

            scope.onTagAdded = function($tag) {
                if(scope.singleSelection) {
                    scope.tags.length = 0;
                    scope.tags.push($tag);
                }
            };

            scope.$watch('tags', function(tags) {
                if(scope.singleSelection) {
                    updateSingleSelectionNgModel(tags);
                } else {
                    updateMultiSelectionNgModel(tags);
                }
            }, true);

            function fillTagsInfo(ngModel, endpoint, displayProperty) {
                if(scope.singleSelection) {
                    fillTagInfo(endpoint, ngModel, displayProperty, 0);
                } else {
                    ngModel.forEach(function(tagId, $index) {
                        fillTagInfo(endpoint, tagId, displayProperty, $index);
                    });
                }
            }

            function updateSingleSelectionNgModel(tags) {
                scope.ngModel = (areThereTags(tags)) ? tags[0]._id : '';
            }

            function updateMultiSelectionNgModel(tags) {
                scope.ngModel.length = 0;
                if(areThereTags(tags)) {
                    tags.forEach(function (tag) {
                        scope.ngModel.push(tag._id);
                    });
                }
            }

            function areThereTags(tags) {
                return tags && tags.length;
            }

            function fillTagInfo(endpoint, tagId, displayProperty, $index) {
                http.get(endpoint + '/' + tagId).then(function(tag) {
                    scope.tags.push({_id: tagId});
                    scope.tags[$index][displayProperty] = tag[displayProperty];
                });
            }
        }
    };
}]);