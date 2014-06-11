define(['app', 'ngload!service/dataServices', 'directive/write', 'directive/navMenu'], function (app) {
    app.controller('ModulesController', function ($scope, $log, DeferredObject, DeferredString, $rootScope) {
        DeferredObject.get("This is defered response", 2000).then(function (result) {
            $scope.obj_response = result;
        });
        $scope.str_response = DeferredString.get("Show case ngWrite with promise", 1000);
    })
}); 
