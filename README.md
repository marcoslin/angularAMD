angularAMD  [![Build Status](https://travis-ci.org/marcoslin/angularAMD.png)](https://travis-ci.org/marcoslin/angularAMD)
==========
angularAMD is an utility that facilitate the use of RequireJS in AngularJS supporting on-demand loading
of 3rd party modules such as [angular-ui](git@github.com:marcoslin/bower-angularAMD.git).

Installation
==========
    bower install angularAMD

Usage
==========

## Bootstrapping

Starting point for a `angularAMD` project is to define a `app.js` module that instantiate `angularAMD`
and to bootstrap AngularJS:

	define(['angularAMD'], function (angularAMD) {
	    var app = angular.module(app_name, ['webapp']),
		ngAMD = angularAMD(app);
	    ... // Setup app here. E.g.: run .config with $routeProvider
	    ngAMD.bootstrap();
	    window.angular = ngAMD.getAlternateAngular();  // Optional
	    return app;
	});

Once `angularAMD` has been initialized, you can access this instance via `app.ngAMD`.  Please note that
`.getAlternateAngular()` is only needed if you wish to perform on-demand loading of  module created using
`angular.module`.

An alternative is to load all 3rd party modules (or any module you coded using `angular.module`) as a
dependency to your `app.js` in your RequireJS' `main.js`:

	require.config({
		paths: {
			'angular': 'lib/angular',
			'angularAMD': 'lib/angularAMD',
			'ui-boostrap': ''lib/ui-bootstrap'
		},
		shim: {
			'app': ['ui-boostrap']
		},
		deps: ['app']
	});


## On-Demand Loading of Controllers

Use `ngAMD.route` when defining the route using `$routeProvider` to enable on-demand loading of controllers:

    app.config(function ($routeProvider) {
        $routeProvider.when(
            "/home",
            ngAMD.route({
                templateUrl: 'views/home.html',
                controller: 'HomeController',
                controllerUrl: 'scripts/controller.js'
            })
        );
    });

You can avoid passing of `controllerUrl` if you define it in your `main.js` as:

    paths: { 'HomeController': 'scripts/controller.js' }


## Creating a Module

All subsquent module definition would simply need to require `app` dependency and use it's `.register` method to create
desired AngularJS services:

    define(['app'], function (app) {
        app.register.factory('Pictures', function (...) {
            ...
        });
    });

Here is the list of properties supported by `app.register`:

    * `.controller`
    * `.factory`
    * `.service`
    * `.constant`
    * `.value`
    * `.directive`
    * `.filter`
    * `.animation`


## Support for 3rd party AngularJS Modules

A wrapper is required to load 3rd party modules created using standard `angular.module` syntax.  Remember that you must
have set `window.angular` using `.getAlternateAngular()` during [Bootstrapping](#bootstrapping) and call `ngAMD.processQueue()`
after all dependcies has been loaded:

    define(['app', 'ui-bootstrap'], function (app) {
        app.ngAMD.processQueue();
    });


History
==========
Inpired by [Dan Wahlin's blog](http://weblogs.asp.net/dwahlin/archive/2013/05/22/dynamically-loading-controllers-and-views-with-angularjs-and-requirejs.aspx)
where he explained the core concept of what is needed to make RequireJS works with AngularJS.  It is a *must* read
if you wish to better understand implementation detail of angularAMD.

This project started with my question on [StackOverflow](http://stackoverflow.com/questions/19134023/lazy-loading-angularjs-modules-with-requirejs) after
exhausive search for a solution to load `angular-ui` on demand.  Although [Nikos Paraskevopoulos](http://stackoverflow.com/users/2764255/nikos-paraskevopoulos)
proposed a solution to my problem, his implementation could not handle `.config` and out of order definition. 

References
==========

http://stackoverflow.com/questions/10924503/angularjs-inject-module-after-app-initialization
http://stackoverflow.com/questions/18591966/inject-module-dynamically-only-if-required
http://stackoverflow.com/questions/19134023/lazy-loading-angularjs-modules-with-requirejs
