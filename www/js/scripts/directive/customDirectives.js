// customDirectives
define(['app'], function (app) {
    app.register.directive('ngWrite', ['$timeout', '$log', function ($timeout, $log) {
        return {
            restrict: 'A',
            //require: "^ngController",
            link: function (scope, elm, attr) {
                // Attempt to read the attribe from scope.  If not found, return what's pass to directive
                var text_value = scope[attr.ngWrite] || attr.ngWrite;
                elm.text(text_value);
            }
        };
    }]);
});
