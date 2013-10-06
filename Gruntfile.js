// Gruntfile
/*jslint devel: true, node: true */

module.exports = function (grunt) {
    'use strict';
    require('load-grunt-tasks')(grunt);
    
    // Config variables
    var configVars = {
        "build": "build",
        "dist": "dist"
    }
    
    grunt.initConfig({
        cvars: configVars,
        bower: {
            install: {
                options: { install: true, copy: false }
            }
        },
        copy: {
            "bower-www": {
                files: [
                    { expand: true, cwd: "bower_components/angular/", src: '*.js', dest: "www/js/lib/angular/" },
                    { expand: true, cwd: "bower_components/requirejs/", src: 'require.js', dest: "www/js/lib/requirejs/" }
                ]
            }
        },
        karma: {
            "unit": {
                configFile: '<%= cvars.build %>/test/conf/karma.unit.js'
            },
            "build": {
                configFile: '<%= cvars.build %>/test/conf/karma.unit.js',
                singleRun: true
            },
            "build-min": {
                configFile: '<%= cvars.build %>/test/conf/karma.unit.min.js',
                singleRun: true
            }
        },
        template: {
            "main-js": {
                src: 'test/unit/lib/main.mustache',
                dest: '<%= cvars.build %>/test/unit/lib/main.js',
                variables: {
                    "angularAMD-js-file": "src/angularAMD"
                }
            },
            "main-min-js": {
                src: 'test/unit/lib/main.mustache',
                dest: '<%= cvars.build %>/test/unit/lib/main.min.js',
                variables: {
                    "angularAMD-js-file": "<%= cvars.build %>/angularAMD.min"
                }
            },
            "karma-js": {
                src: 'test/conf/karma.unit.mustache',
                dest: '<%= cvars.build %>/test/conf/karma.unit.js',
                variables: {
                    "main-js-file": "<%= cvars.build %>/test/unit/lib/main.js"
                }
            },
            "karma-min-js": {
                src: 'test/conf/karma.unit.mustache',
                dest: '<%= cvars.build %>/test/conf/karma.unit.min.js',
                variables: {
                    "main-js-file": "<%= cvars.build %>/test/unit/lib/main.min.js"
                }
            }
        },
        uglify: {
            build: {
                options: {
                    'report': true
                },
                files: {
                    '<%= cvars.build %>/angularAMD.min.js': ['src/angularAMD.js']
                }
            }
        }
    });
    
    grunt.registerTask('setup', ['bower:install', 'copy:bower-www']);
    grunt.registerTask('test', [
        'template:main-js','template:karma-js',
        'karma:unit'
    ]);
    
    /**
     * build the file, by testing the src/angularAMD.js first, minimize it, then test the minimized version
     */
    grunt.registerTask('build', [
        'template:main-js','template:karma-js',
        'template:main-min-js','template:karma-min-js',
        'karma:build',
        'uglify:build',
        'karma:build-min'
    ]);
    
};



