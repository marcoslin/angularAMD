// Gruntfile
/*jslint devel: true, node: true, white:true */

module.exports = function (grunt) {
    'use strict';
    require('load-grunt-tasks')(grunt);

    // Config variables
    var configVars = {
        "build": "build",
        "dist_www": "../gh-pages",
        "dist_bower": "../bower-repo",
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
        watch: {
            'watch-www': {
                files: [
                    '**/*.js'
                ],
                tasks: [
                    'copy:watch-www'
                ],
                options: {
                    cwd: 'src/',
                    interrupt: true,
                    spawn: false
                },
            },
        },
        copy: {
            "watch-www": {
                files: [
                    {
                        expand: true, cwd: "src/",
                        src: 'angularAMD.js', dest: "www/js/lib/requirejs/"
                    },
                    {
                        expand: true, cwd: "src/",
                        src: 'ngload.js', dest: "www/js/lib/requirejs/"
                    },
                ]
            },
            "setup-www": {
                files: [
                    {
                        expand: true, cwd: "src/",
                        src: 'angularAMD.js', dest: "www/js/lib/requirejs/"
                    },
                    {
                        expand: true, cwd: "src/",
                        src: 'ngload.js', dest: "www/js/lib/requirejs/"
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
                        expand: true, cwd: "bower_components/google-code-prettify/src/",
                        src: 'prettify.js', dest: "www/js/lib/google-code-prettify/"
                    },
                    {
                        expand: true, cwd: "bower_components/google-code-prettify/src/",
                        src: 'prettify.css', dest: "www/css/"
                    },
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
            },
            "dist-www": {
                files: [
                    {
                        src: '<%= cvars.build %>/angularAMD.min.js',
                        dest: "<%= cvars.dist_www %>/js/lib/requirejs/angularAMD.js"
                    },
                    {
                        src: '<%= cvars.build %>/ngload.min.js',
                        dest: "<%= cvars.dist_www %>/js/lib/requirejs/ngload.js"
                    },
                    {
                        src: 'bower_components/angular/angular.min.js',
                        dest: "<%= cvars.dist_www %>/js/lib/angular/angular.js"
                    },
                    {
                        src: 'bower_components/angular-route/angular-route.min.js',
                        dest: "<%= cvars.dist_www %>/js/lib/angular/angular-route.js"
                    },
                    {
                        src: 'bower_components/angular-ui-bootstrap-bower/ui-bootstrap-tpls.min.js',
                        dest: "<%= cvars.dist_www %>/js/lib/angular-ui-bootstrap/ui-bootstrap-tpls.js"
                    },
                    {
                        expand: true, cwd: "bower_components/google-code-prettify/src/",
                        src: 'prettify.js', dest: "<%= cvars.dist_www %>/js/lib/google-code-prettify/"
                    },
                ]
            },
            "dist-bower" : {
                files: [
                    {
                        src: 'src/angularAMD.js',
                        dest: "<%= cvars.dist_bower %>/angularAMD.js"
                    },
                    {
                        src: '<%= cvars.build %>/angularAMD.min.js',
                        dest: "<%= cvars.dist_bower %>/angularAMD.min.js"
                    },
                    {
                        src: 'src/ngload.js',
                        dest: "<%= cvars.dist_bower %>/ngload.js"
                    },
                    {
                        src: '<%= cvars.build %>/ngload.min.js',
                        dest: "<%= cvars.dist_bower %>/ngload.min.js"
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
                configFile: '<%= cvars.build %>/test/conf/karma.unit.js',
                singleRun: false
            },
            "unit-no-ngload": {
                configFile: 'test/conf/karma.unit.no_ngload.js',
                singleRun: false
            },
            "build": {
                configFile: '<%= cvars.build %>/test/conf/karma.unit.js',
                browsers: ['PhantomJS','Chrome','Firefox']
            },
            "build-min": {
                configFile: '<%= cvars.build %>/test/conf/karma.unit.min.js',
                browsers: ['PhantomJS','Chrome','Firefox']
            },
            "build-travis": {
                configFile: '<%= cvars.build %>/test/conf/karma.unit.min.js'
            }
        },
        template: {
            "main-js": {
                src: 'test/unit/lib/main.mustache',
                dest: '<%= cvars.build %>/test/unit/lib/main.js',
                variables: {
                    "angularAMD-js-file": "src/angularAMD",
                    "ngload-js-file": "src/ngload"
                }
            },
            "main-min-js": {
                src: 'test/unit/lib/main.mustache',
                dest: '<%= cvars.build %>/test/unit/lib/main.min.js',
                variables: {
                    "angularAMD-js-file": "<%= cvars.build %>/angularAMD.min",
                    "ngload-js-file": "<%= cvars.build %>/ngload.min"
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
                    '<%= cvars.build %>/angularAMD.min.js': ['src/angularAMD.js'],
                    '<%= cvars.build %>/ngload.min.js': ['src/ngload.js']
                }
            },
            "dist-www": {
                files: [
                    {
                        expand: true, cwd: "www/js/",
                        src: 'main.js', dest: "<%= cvars.dist_www %>/js/"
                    },
                    {
                        expand: true, cwd: "www/js/scripts/",
                        src: '**/*.js', dest: "<%= cvars.dist_www %>/js/scripts/"
                    },
                    {
                        src: 'bower_components/requirejs/require.js',
                        dest: "<%= cvars.dist_www %>/js/lib/requirejs/require.js"
                    },
                    {
                        expand: true, cwd: "bower_components/requirejs-plugins/src/",
                        src: 'async.js', dest: "<%= cvars.dist_www %>/js/lib/requirejs/"
                    }
                ]
            }
        },
        cssmin: {
            "dist-www": {
                files: {
                    '<%= cvars.dist_www %>/css/style.css': 'www/css/style.css',
                    '<%= cvars.dist_www %>/css/prettify.css': 'www/css/prettify.css',
                    '<%= cvars.dist_www %>/css/sons-of-obsidian.css': 'www/css/sons-of-obsidian.css'
                }
            }
        },
        htmlmin : {
            "dist-www": {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true, cwd: "www/",
                    src: '**/*.html', dest: "<%= cvars.dist_www %>/"
                }]
            }
        }
    });


    /* BASIC TASKS */
    grunt.registerTask('setup', ['bower:setup']);
    grunt.registerTask('genTestTemplates', [
        'template:main-js','template:karma-js',
        'template:main-min-js','template:karma-min-js'
    ]);


    /*
    Designed to be used during the dev and contains 2 distinct tests:
      - unit
      - unit-no-ngload

    The `grunt test` will kick off the `unit` test first, and after
    `ctrl-c` will kick off `unit-no-ngload` test.  This is needed as
    it was dificult to load 2 different instance of angularAMD.  The
    race condition was redering subsequent test with both ngload and
    no-ngload version unpredictable.
    */
    grunt.registerTask('test', [
        'setup',
        'genTestTemplates',
        'karma:unit',
        'karma:unit-no-ngload'
    ]);


    /* Done with dev, build it by creating a minified version */
    grunt.registerTask('build', [
        'setup',
        'genTestTemplates',
        'karma:build',
        'uglify:build',
        'karma:build-min'
    ]);
    grunt.registerTask('build-travis', [
        'setup',
        'genTestTemplates',
        'uglify:build',
        'karma:build-travis'
    ]);

    /* Setup/Development watcher */
    /* @note If tmux is used, try running grunt watch-www and grunt serve-www
     * in different windows under one session. */
    grunt.registerTask('watch-www', [
        'watch:watch-www',
        'genTestTemplates',
        'karma:build',
        'uglify:build',
        'karma:build-min'
    ]);

    /* Run sample website */
    grunt.registerTask('setup-www', ['copy:setup-www']);
    grunt.registerTask('serve-www', [
        'setup-www', 'open',
        'connect:serve-www'
    ]);

    /* Create github pages */
    grunt.registerTask('dist-www', [
        'cssmin:dist-www',
        'uglify:dist-www',
        'htmlmin:dist-www',
        'copy:dist-www'
    ]);

    /* Update bower repository -- must run build manually before this */
    grunt.registerTask('dist-bower', ['copy:dist-bower']);

};



