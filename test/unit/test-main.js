require.config({
    // The baseUrl depends on what is defined in karma.unit.js:basePath
    baseUrl: "/base",
    
    // alias libraries paths
    paths: {
        'angularAMD': 'src/angularAMD',
        'angular': 'bower_components/angular/angular',
        'testSpec': 'test/unit/testSpec'
    },
    
    shim: {
        'angular': {
            exports: 'angular'
        },
        'angularAMD': ['angular']
    },
    
    deps: ['testSpec'],
    
    // start test run, once Require.js is done
    callback: window.__karma__.start
});
