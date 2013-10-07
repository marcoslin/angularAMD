require.config({

    baseUrl: "/js",
    
	// alias libraries paths
    paths: {
        'angular': 'lib/angular/angular',
        'angular-route': '//ajax.googleapis.com/ajax/libs/angularjs/1.2.0-rc.2/angular-route.min',
        'angular-resource': '//ajax.googleapis.com/ajax/libs/angularjs/1.2.0-rc.2/angular-resource.min',
        'ui-bootstrap': 'scripts/directive/ui-bootstrapAMD',
        'async': 'lib/requirejs/async',
        'domReady': 'lib/requirejs/domReady',
        'angularAMD': 'lib/requirejs/angularAMD',

        'navMenu': 'scripts/directive/navMenu',
        'dataServices': 'scripts/service/dataServices',
        'moreServices': 'scripts/service/moreServicesAMD',
        'gmaps': 'scripts/service/gmaps',
        'customDirectives': 'scripts/directive/customDirectives',
        'View1Controller': 'scripts/controller/view1_ctrl',
        'View2Controller': 'scripts/controller/view2_ctrl',
        'View3Controller': 'scripts/controller/view3_ctrl',
        'ViewMapController': 'scripts/controller/view_map_ctrl',
        'app': 'scripts/app'
    },

    // Add angular modules that does not support AMD out of the box, put it in a shim
    shim: {
        'angular-route': ['angular'],
        'angular-resource': ['angular'],
        'moreServices': ['angular-resource']
    },

    // kick start application
    deps: ['app']
});
