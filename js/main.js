require.config({

    baseUrl: "/js/scripts",
    
	// alias libraries paths
    paths: {
        'angular': '../lib/angular/angular',
        'angular-route': '//ajax.googleapis.com/ajax/libs/angularjs/1.2.0-rc.2/angular-route.min',
        'async': '../lib/requirejs/async',
        'domReady': '../lib/requirejs/domReady',
        'angularAMD': '../lib/requirejs/angularAMD',
        'ui-bootstrap': '../lib/angular-ui-bootstrap/ui-bootstrap-tpls',

        'HomeController': 'controller/home_ctrl',
        'MapController': 'controller/map_ctrl',
        'PicturesController': 'controller/pictures_ctrl',
        'ModulesController': 'controller/modules_ctrl',
    },

    // Add angular modules that does not support AMD out of the box, put it in a shim
    shim: {
        'angular-route': ['angular']
    },

    // kick start application
    deps: ['app']
});
