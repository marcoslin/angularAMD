define(['app', 'service/gmaps', 'directive/navMenu'], function (app, gmaps) {
    app.register.controller('MapController', ['$scope', '$log', function ($scope, $log) {
        $scope.title = "Where is Colosseo?"; 
        // Set the location to be Colosseum
        var latLong = new gmaps.LatLng(41.8902, 12.4923),
            mapOptions = {
                zoom: 16,
                center: latLong,
                draggable: true,
                mapTypeId: gmaps.MapTypeId.ROADMAP,
                panControl: false,
                disableDoubleClickZoom: true,
                disableDefaultUI: true,
                zoomControl: false
            };

        // Create the map
        var map = new gmaps.Map(document.getElementById('map-canvas'), mapOptions),
            marker = new gmaps.Marker({position: latLong, draggable: true, map: map});
        
    }])
}); 
