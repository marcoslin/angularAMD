/*jslint browser: true, node: true, nomen: true */

require.config({
    // The baseUrl depends on what is defined in karma.unit.js:basePath
    baseUrl: "/base",
    
    // alias libraries paths
    paths: {
        'angular': 'bower_components/angular/angular',
        'angularAMD': 'src/angularAMD',
        'app': 'test/unit/lib/app',
        'testSpec': 'test/unit/testSpec'
    },
    
    shim: {
        'angular': {
            exports: 'angular'
        }
    },
    
    deps: ['testSpec'],
    
    // start test run, once Require.js is done
    callback: window.__karma__.start
});
