angular.module("customDirectives", [])
.directive('ngWrite', function ($timeout, $log) {
    return {
        restrict: 'A',
        link: function (scope, elm, attr) {
            var text_value = scope[attr.ngWrite];
            elm.text(text_value);
            //$log.log("text: ", text_value);
        }
    };       
});