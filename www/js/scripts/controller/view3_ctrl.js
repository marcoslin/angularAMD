define(['app', 'customDirectives', 'moreServices', 'navMenu'], function (app) {
    app.register.controller('View3Controller', ['$scope', '$log', 'DeferredResponse', 'AnotherResponse', '$rootScope', function ($scope, $log, DeferredResponse, AnotherResponse, $rootScope) {
        $scope.deferred = DeferredResponse.set("This is defered response");
        $scope.another = AnotherResponse.set("This is another response");
        $scope.ngWrite_message = "hello there.";
    }])
}); 
