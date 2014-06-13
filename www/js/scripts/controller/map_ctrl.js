define(['app', 'service/mapServices', 'directive/navMenu'], function (app) {
    app.controller('MapController', function ($scope, MapService) {
        $scope.title = "Where is Colosseo?";
        $scope.latitude = 41.8902;
        $scope.longitude = 12.4923;
        
        // Set the location to be Colosseum
        MapService.initialize($scope, "map-canvas");
    })
}); 
