// customDirectives
define(['app'], function (app) {
    
    app.register.directive('ngWrite', function ($timeout, $log) {
        return {
            restrict: 'A',
            link: function (scope, elm, attr) {
                var text_value = scope[attr.ngWrite];
                elm.text(text_value);
            }
        };
    });

});