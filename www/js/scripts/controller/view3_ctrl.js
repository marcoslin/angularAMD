define(['app', 'customDirectives', 'moreServices'], function (app) {
    app.register.controller('View3Controller', ['$scope', '$log', 'DeferredResponse', 'AnotherResponse', '$rootScope', function ($scope, $log, DeferredResponse, AnotherResponse, $rootScope) {
        console.log("$rootScope.$id: " + $rootScope.$id);
        $scope.title = "View 3 - Depends on customDirectives";
        $scope.deferred = DeferredResponse.set("This is defered response");
        $scope.another = AnotherResponse.set("This is another response");
    }])
}); 
