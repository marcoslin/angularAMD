// customDirectives
define(['app'], function (app) {
    app.directive('ngWrite', function ($timeout, $log) {
        return {
            restrict: 'A',
            //require: "^ngController",
            link: function (scope, elm, attr) {
                // Attempt to read the attribe from scope.  If not found, return what's pass to directive
                if (scope[attr.ngWrite]) {
                    // ngWrite is found in scope.  Check if promised has been returned
                    var inval = scope[attr.ngWrite];
                    if ('then' in inval) {
                        inval.then(function (data) {
                            elm.text(data);
                        });
                    } else {
                        elm.text(inval);
                    }
                } else {
                    elm.text(attr.ngWrite);
                }
            }
        };
    });
});
