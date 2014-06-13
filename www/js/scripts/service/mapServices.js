// convert Google Maps into an AMD module
define(['app', 'async!//maps.google.com/maps/api/js?v=3&sensor=false'], function (app) {
    app.service('MapService', function () {
        var gmaps =  window.google.maps,
            mapOptions = {
                zoom: 15,
                draggable: true,
                mapTypeId: gmaps.MapTypeId.ROADMAP,
                panControl: false,
                disableDoubleClickZoom: true,
                disableDefaultUI: true,
                zoomControl: false
            },
            latLng;

        /**
         * Create map with initial position given by scope.latitude and scope.longitude.
         * Default to LatLng of Colosseo in Rome
         */
        this.initialize = function (scope, elementName) {
            var lat = scope.latitude || 41.8902,
                lng = scope.longitude || 12.4923,
                map = new gmaps.Map(document.getElementById(elementName), mapOptions);
            
            // Set initial position
            if (!latLng) {
                latLng = new gmaps.LatLng(lat, lng);
            } else {
                scope.latitude = latLng.lat();
                scope.longitude = latLng.lng();
            }
            map.setCenter(latLng);
            var marker = new gmaps.Marker({position: latLng, draggable: true, map: map});
            
            // Keep track of position of marker
            gmaps.event.addListener(marker, 'dragend', function (movedMarker) {
                latLng = movedMarker.latLng;
                scope.latitude = latLng.lat();
                scope.longitude = latLng.lng();
                scope.$apply(function () {
                    marker.setPosition(latLng);
                });
            });
        };
            
    });
});
// REF: http://blog.millermedeiros.com/requirejs-2-0-delayed-module-evaluation-and-google-maps/