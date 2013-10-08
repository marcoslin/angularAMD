// Gruntfile
/*jslint devel: true, node: true, white:true */

module.exports = function (grunt) {
    'use strict';
    require('load-grunt-tasks')(grunt);
    
    // Config variables
    var configVars = {
        "build": "build",
        "dist": "dist",
        "www_port": "9768",
        "www_server": "localhost"
    };
    
    grunt.initConfig({
        cvars: configVars,
        bower: {
            setup: {
                options: { install: true, copy: false }
            }
        },
        copy: {
            "setup-www": {
                files: [
                    {
                        expand: true, cwd: "src/",
                        src: 'angularAMD.js', dest: "www/js/lib/requirejs/"
                    },
                    {
                        expand: true, cwd: "bower_components/angular/",
                        src: 'angular.js', dest: "www/js/lib/angular/"
                    },
                    {
                        expand: true, cwd: "bower_components/angular-route/",
                        src: 'angular-route.js', dest: "www/js/lib/angular/"
                    },
                    {
                        expand: true, cwd: "bower_components/angular-ui-bootstrap-bower/",
                        src: ['ui-bootstrap-tpls.js'], dest: "www/js/lib/angular-ui-bootstrap/"
                    },
                    {
                        expand: true, cwd: "bower_components/requirejs/",
                        src: 'require.js', dest: "www/js/lib/requirejs/"
                    },
                    {
                        expand: true, cwd: "bower_components/requirejs-plugins/src/",
                        src: 'async.js', dest: "www/js/lib/requirejs/"
                    },
                    {
                        expand: true, cwd: "bower_components/domReady/",
                        src: 'domReady.js', dest: "www/js/lib/requirejs/"
                    }
                ]
            },
            "build-www": {
                files: [
                    {
                        expand: true, cwd: "www/",
                        src: ['index.html','css/**', 'views/**', 'js/main.js', 'js/scripts/**'],
                        dest: "<%= cvars.build %>/www/"
                    }
                ]
            }
        },
        connect: {
            // URL should be: http://localhost:9768/www/ to simulate github pages
            options : {
                hostname: '<%= cvars.www_server %>',
                port: '<%= cvars.www_port %>',
                base: '.'
            },
            "serve-www": {
                options : {
                    keepalive: true
                }
            }
        },
        open: {
            "serve-www": {
                path: 'http://<%= cvars.www_server %>:<%= cvars.www_port %>/www/',
                app: 'Google Chrome Canary'
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
        },
        useminPrepare: {
            html: 'www/index.html',
            options: {
                dest: '<%= cvars.build %>'
            }
        },
        usemin: {
            html: ['www/{,*/}*.html'],
            css: ['www/css/*.css']
        },
        cssmin: {
            // Setup by usemin
        },
        htmlmin : {
            // Setup by usemin
        }
    });
    
    grunt.registerTask('setup', ['bower:setup']);
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
    
    
    grunt.registerTask('setup-www', ['copy:setup-www']);
    grunt.registerTask('serve-www', ['setup-www', 'open', 'connect:serve-www']);
    grunt.registerTask('build-www', [
        'useminPrepare',
        'concat',
        'cssmin',
        'htmlmin'
    ]);
    
};



