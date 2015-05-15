'use strict';
menzit.directive('onTouchStart', [function() {

    return function(scope, element, attr) {

        element.on('touchstart',execute);
        element.on('mousedown',execute);
        preventLongPressMenu(element[0]);

        function execute() {
            scope.$apply(function() {
                scope.$eval(attr.onTouchStart);
            });
        }

        function absorbEvent_(event) {
            var e = event || window.event;
            e.preventDefault && e.preventDefault();
            e.stopPropagation && e.stopPropagation();
            e.cancelBubble = true;
            e.returnValue = false;
            return false;
        }

        function preventLongPressMenu(node) {
            node.ontouchstart = absorbEvent_;
            node.ontouchmove = absorbEvent_;
            node.ontouchend = absorbEvent_;
            node.ontouchcancel = absorbEvent_;
        }
    };

}]).directive('onTouchEnd', [function() {

    return function(scope, element, attr) {

        element.on('touchend', execute);
        element.on('mouseup', execute);

        function execute() {
            scope.$apply(function() {
                scope.$eval(attr.onTouchEnd);
            });
        }
    };
}]);