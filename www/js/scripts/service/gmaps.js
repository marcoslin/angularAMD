// convert Google Maps into an AMD module
define(['async!http://maps.google.com/maps/api/js?v=3&sensor=false'], function () {
    // return the gmaps namespace for brevity
    return window.google.maps;
});
// REF: http://blog.millermedeiros.com/requirejs-2-0-delayed-module-evaluation-and-google-maps/