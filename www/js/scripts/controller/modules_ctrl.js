define(['app', 'service/moreServicesAMD', 'directive/customDirectives', 'directive/navMenu'], function (app) {
    app.register.controller('ModulesController', ['$scope', '$log', 'DeferredResponse', 'AnotherResponse', '$rootScope', function ($scope, $log, DeferredResponse, AnotherResponse, $rootScope) {
        $scope.deferred = DeferredResponse.set("This is defered response");
        $scope.another = AnotherResponse.set("This is another response");
        $scope.ngWrite_message = "hello there.";
    }])
}); 
