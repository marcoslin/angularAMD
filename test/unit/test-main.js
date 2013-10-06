/*jslint browser: true, node: true, nomen: true */

require.config({
    // The baseUrl depends on what is defined in karma.unit.js:basePath
    baseUrl: "/base",
    
    // alias libraries paths
    paths: {
        'angular': 'bower_components/angular/angular',
        'angular-mocks': 'bower_components/angular-mocks/angular-mocks',
        'angularAMD': 'src/angularAMD',
        'app': 'test/unit/lib/app',
        'controller': 'test/unit/lib/controller',
        'services': 'test/unit/lib/services',
        'servicesAMD': 'test/unit/lib/servicesAMD',
        'appSpec': 'test/unit/appSpec',
        'servicesSpec': 'test/unit/servicesSpec',
        'controllerSpec': 'test/unit/controllerSpec'
    },
    
    shim: {
        /*
        'services' in this case is a regular angular.js module and therefore non-requirejs module so 
        must be defined in shim.  This is critical as 'services' depends on processing in 'app' to
        support loading of regular angular.js modules.
        */
        'services': ['app']
    },
    
    deps: ['controllerSpec', 'servicesSpec', 'appSpec'],
    
    // start test run, once Require.js is done
    callback: window.__karma__.start
});
