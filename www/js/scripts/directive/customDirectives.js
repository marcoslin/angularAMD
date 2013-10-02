define(['app'], function (app) {

    /*
    var directive_module = angular.module("customDirectives", []);
    
    directive_module.directive('ngWrite', function ($timeout, $log) {
    */
    
    app.register.directive('ngWrite', function ($timeout, $log) {
        return {
            restrict: 'A',
            link: function (scope, elm, attr) {
                var text_value = scope[attr.ngWrite];
                elm.text(text_value);
                //$log.log("text: ", text_value);
            }
        };       
    });
        
});