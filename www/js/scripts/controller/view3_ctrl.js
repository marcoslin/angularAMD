define(['app', 'customDirectives', 'moreServices'], function (app) {
    //var injector = angular.injector(["moreServices","ng"]);
    //app.register.factory("DeferredResponse", injector.get("DeferredResponse"));
    
    app.register.controller('View3Controller', ['$scope', '$log', 'DeferredResponse', function ($scope, $log, DeferredResponse) {
        //var DeferredResponse = injector.get("DeferredResponse");
        $scope.title = "View 3 - Depends on customDirectives";
        $scope.deferred = DeferredResponse.set("This is defered response");
    }])
}); 
