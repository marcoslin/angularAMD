// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html
/*jslint node: true */

module.exports = function (config) {
    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: '../..',
        
        // testing framework to use (jasmine/mocha/qunit/...)
        frameworks: ['jasmine', 'requirejs'],
        
        // list of files / patterns to load in the browser
        files: [
            {pattern: 'bower_components/angular/*.js', watched: false, included: false},
            {pattern: 'bower_components/angular-mocks/angular-mocks.js', watched: false, included: false},
            {pattern: 'src/angularAMD.js', watched: true, included: false},
            {pattern: 'test/unit/*Spec.js', watched: true, included: false},
            {pattern: 'test/unit/lib/*.js', watched: true, included: false},
            'bower_components/requirejs/require.js',
            'test/unit/test-main.js'
        ],
        
        // files: ['test/conf/testSpec.js'],

        // list of files / patterns to exclude
        exclude: [],
        
        // web server port
        port: 9898,
        
        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,
        
        
        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,
        
        
        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['ChromeCanary'],

        
        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false
    });
};
