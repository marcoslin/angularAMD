angularAMD  [![Build Status](https://travis-ci.org/marcoslin/angularAMD.png)](https://travis-ci.org/marcoslin/angularAMD)
==========
angularAMD is an utility that facilitate the use of RequireJS in AngularJS applications supporting on-demand loading
of 3rd party modules such as [angular-ui](git@github.com:marcoslin/bower-angularAMD.git).

Installation
==========
    bower install angularAMD

Usage
==========

## Bootstrapping

Starting point for a `angularAMD` app is to define a `app.js` module that instantiate `angularAMD`
and bootstraping AngularJS:

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

An alternative to `.getAlternateAngular()` is to load all your 3rd party modules (or any module you coded
using `angular.module`) as a dependency to your `app.js` in your `main.js`:

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

Use `ngAMD.route` when configuring routes using `$routeProvider` to enable on-demand loading of controllers:

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

The primary purpose of `ngAMD.route` is set `.resolve` property to load controller using `require` statement.
Any attribute you pass into this method will simply be returned, with exception of `controllerUrl`. 


## Creating a Module

All subsquent module definition would simply need to require `app` dependency and use `app.register` property to create
desired AngularJS services:

    define(['app'], function (app) {
        app.register.factory('Pictures', function (...) {
            ...
        });
    });

Here is the list of methods supported by `app.register`:

    * .controller
    * .factory
    * .service
    * .constant
    * .value
    * .directive
    * .filter
    * .animation


## 3rd Party AngularJS Modules

A wrapper is required to load 3rd party modules created using standard `angular.module` syntax that defines
all the modules that needs to be loaded and it's dependencies.  Remember that you must have called
`.getAlternateAngular()` during [Bootstrapping](#bootstrapping) in order for this to work.

After all the dependencies has been loaded, run `ngAMD.processQueue()`:

    define(['app', 'ui-bootstrap'], function (app) {
        app.ngAMD.processQueue();
    });


History
==========
Inpired by [Dan Wahlin's blog](http://weblogs.asp.net/dwahlin/archive/2013/05/22/dynamically-loading-controllers-and-views-with-angularjs-and-requirejs.aspx)
where he explained the core concept of what is needed to make RequireJS works with AngularJS.  It is a *must* read
if you wish to better understand implementation detail of angularAMD.

As I started to implement RequireJS in my own project, I was stuck trying to figure out how to load my existing modules
without re-writting them.  After exhausive search with no satisfactory answer, I posted following question on 
[StackOverflow](http://stackoverflow.com/questions/19134023/lazy-loading-angularjs-modules-with-requirejs).
[Nikos Paraskevopoulos](http://stackoverflow.com/users/2764255/nikos-paraskevopoulos) was kind enough to share his
solution with me but his implementation did not handle `.config` method and out of order definition in modules.
However, his implementation gave me the foundation needed to support loading of 3rd party modules and source
of the `.getAlternateAngular()` idea.

References
==========

    * [Dynamically Loading Controllers and Views with AngularJS and RequireJS](http://weblogs.asp.net/dwahlin/archive/2013/05/22/dynamically-loading-controllers-and-views-with-angularjs-and-requirejs.aspx) by Dan Wahlin
    * [Lazy loading AngularJS modules with RequireJS](http://stackoverflow.com/questions/19134023/lazy-loading-angularjs-modules-with-requirejs) stackoverflow
    * [angular-require-lazt](https://github.com/nikospara/angular-require-lazy) by Nikos Paraskevopoulos
