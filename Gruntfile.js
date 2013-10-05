// Gruntfile
/*jslint devel: true, node: true */

module.exports = function (grunt) {
    'use strict';
    require('load-grunt-tasks')(grunt);
    
    grunt.initConfig({
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
        }
    });
    
    grunt.registerTask('setup', ['bower:install', 'copy:bower-www']);
    
};



