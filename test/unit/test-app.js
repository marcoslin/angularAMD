define(['angularAMD'], function (angularAMD) {
    var app = angular.module("ngreq-app", ['ngRoute']),
        ngAMD = angularAMD(app);
    
    /**
     * Configure Angular ngApp with route and cache the needed providers
     */
    app.ngAMD = ngAMD;
    
    // Bootstrap Angular
    angular.bootstrap(document, ['ngreq-app']);

    // Wire custom version of angular
    window.angular = ngAMD.getAlternateAngular();

    return app;
});
