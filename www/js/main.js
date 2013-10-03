require.config({

    baseUrl: "/js",
    
	// alias libraries paths
    paths: {
        'async': 'libs/requirejs/async',
        'domReady': 'libs/requirejs/domReady',
        'angularAMD': 'libs/requirejs/angularAMD',
        'gmaps': 'libs/google/gmaps',
        'angular': '//ajax.googleapis.com/ajax/libs/angularjs/1.2.0-rc.2/angular.min',
        'angular-route': '//ajax.googleapis.com/ajax/libs/angularjs/1.2.0-rc.2/angular-route.min',
        'angular-resource': '//ajax.googleapis.com/ajax/libs/angularjs/1.2.0-rc.2/angular-resource.min',
        'dataServices': 'scripts/service/dataServices',
        'moreServices': 'scripts/service/moreServices',
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
        'moreServices' : ['angular-resource']
    },

    // kick start application
    deps: ['app']
});