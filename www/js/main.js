require.config({

	// alias libraries paths
    paths: {
        'angular-route': 'libs/angular/angular-route',
        'angular-resource': 'libs/angular/angular-resource',
        'dataServices': 'scripts/service/dataServices',
        'moreServices': 'scripts/service/moreServices',
        'customDirectives': 'scripts/directive/customDirectives',
        'View1Controller': 'scripts/controller/view1_ctrl',
        'View2Controller': 'scripts/controller/view2_ctrl',
        'View3Controller': 'scripts/controller/view3_ctrl',
        'app': 'scripts/app'
    },

    // angular does not support AMD out of the box, put it in a shim
    shim: {
        'angular-route': {
            exports: 'angular-route'
        },
        'angular-resource': {
            exports: 'angular-resource'
        },
        'moreServices' : {
            exports: "moreServices",
            deps: ['angular-resource']
        },
        'app': {
            deps: ['angular-resource']
        }
    },

    // kick start application
    deps: ['./bootstrap']
});