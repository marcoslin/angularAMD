define(['app', 'service/dataServicesAMD', 'directive/write', 'directive/navMenu'], function (app) {
    app.register.controller('ModulesController', ['$scope', '$log', 'DeferredObject', 'DeferredString', '$rootScope', function ($scope, $log, DeferredObject, DeferredString, $rootScope) {
        $scope.obj_response = DeferredObject.get("This is defered response", 4000);
        $scope.str_response = DeferredString.get("Show case ngWrite with promise", 3000);
    }])
}); 
