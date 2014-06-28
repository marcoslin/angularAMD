angularAMD v0.2.0-rc.1  [![Build Status](https://travis-ci.org/marcoslin/angularAMD.png)](https://travis-ci.org/marcoslin/angularAMD)
==========
angularAMD is an utility that facilitate the use of RequireJS in AngularJS applications supporting on-demand loading
of 3rd party modules such as [angular-ui](git@github.com:marcoslin/bower-angularAMD.git).

Installation
==========

### bower
    bower install angularAMD

### cdn
    //cdn.jsdelivr.net/angular.amd/0.1.1/angularAMD.min.js

_*Note*: Release Candidate versions not distributed._

Usage
==========

http://marcoslin.github.io/angularAMD/ has been created as a working demo for `angularAMD`.  The source code
can be found in the `www/` directory of this project.

### RequireJS data-main

Starting point for any RequireJS app is a `main.js`, which should be used to define the components and their
dependencies.  Use `deps` to kick off `app.js`:

```Javascript
require.config({
    baseUrl: "js",
    paths: {
        'angular': '//ajax.googleapis.com/ajax/libs/angularjs/1.2.16/angular.min',
        'angularAMD': 'lib/angularAMD.min',
        'ngload': 'lib/ngload.min'
    },
    shim: {
        'angularAMD': ['angular'],
        'ngload': ['angularAMD']
    },    
    deps: ['app']
});
```

### Bootstrapping AngularJS

Once components' dependencies has been defined, use a `app.js` to create AngularJS application and perform bootstrapping:

```Javascript
define(['angularAMD'], function (angularAMD) {
    var app = angular.module(app_name, ['webapp']);
    ... // Setup app here. E.g.: run .config with $routeProvider
    return angularAMD.bootstrap(app);
});
```

As bootstrapping is taking place manually, `ng-app` should not be used in HTML.  `angularAMD.bootstrap(app);` will take care of bootstraping AngularJS.

### On-Demand Loading of Controllers

Use `angularAMD.route` when configuring routes using `$routeProvider` to enable on-demand loading of controllers:

```Javascript
app.config(function ($routeProvider) {
    $routeProvider.when(
        "/home",
        angularAMD.route({
            templateUrl: 'views/home.html',
            controller: 'HomeController',
            controllerUrl: 'scripts/controller.js'
        })
    );
});
```

The primary purpose of `angularAMD.route` is set `.resolve` property to load controller using `require` statement.
Any attribute you pass into this method will simply be returned, with exception of `controllerUrl`. 

#### route without `controllerUrl`

You can avoid passing of `controllerUrl` if you define it in your `main.js` as:

```Javascript
paths: { 'HomeController': 'scripts/controller' }
```


#### route without `controller`

When `controller` option is omitted, `angularAMD.route` assume that a function will be returned from the module defined
by `controllerUrl`.  As result, you can avoid giving an explicit name to your controller by doing:

```Javascript
define(['app'], function (app) {
    return ["$scope", function ($scope) {
        ...
    }];
});
```


### Creating a Module

All subsequent module definition would simply need to require `app` to create desired AngularJS services:

```Javascript
define(['app'], function (app) {
    app.factory('Pictures', function (...) {
        ...
    });
});
```

Here is the list of methods supported:

* `.provider` **
* `.controller`
* `.factory`
* `.service`
* `.constant`
* `.value`
* `.directive`
* `.filter`
* `.animation`

** Only as of 0.2.x

#### Loading Application Wide Module

Normally, an application wide feature are created as independent module and added as dependency to your `app`.
 3rd party packages such as [ui-bootstrap](http://angular-ui.github.io/bootstrap/) is perfect example.  However,
 what if you have a single directive?  `angularAMD` simply such task by exposing the provider recipe so you can do
 something like:

**directive/navMenu.js**
```Javascript
define(['angularAMD'], function (angularAMD) {
    angularAMD.directive('navMenu', function (...) {
        ...
    });
});
```

**app.js**
```Javascript
define(['angularAMD', 'directive/navMenu'], function (angularAMD) {
    var app = angular.module(app_name, ['webapp']);
    ...
    // `navMenu` is automatically registered bootstrap 
    return angularAMD.bootstrap(app);
});
```

In this case, `angularAMD.directive` will detect that boostrap hasn't taken place yet and it will queue up the
directive creation request and apply that request directly on the `app` object passed to `angularAMD.bootstrap`.  If bootstrap has taken place already, it will essentially do the same thing `app.directive`.  As result, services created using `angularAMD.<<recipe>>` can be loaded before and after bootstrap.

### 3rd Party AngularJS Modules

3rd party AngularJS module, meaning any module created using `angular.module` syntax, can be loaded as any normal
JavaScript file *before* `angularAMD.bootstrap` is called.  After bootstraping, any AngularJS module must be loaded
using the included `ngload` RequireJS plugin.

```Javascript
define(['app', 'ngload!dataServices'], function (app) {...});
```

In case you need to load your module using RequireJS plugin or if you have complex dependecies, you can create a wrapper
RequireJS module as below:

```Javascript
define(['angularAMD', 'ui-bootstrap'], function (angularAMD) {
    angularAMD.processQueue();
});
```

In this case, all dependencies will be queued up and when `.processQueue()` is called, it will go through the queued
and copy them into current app using `app.register`:

#### Module without `.run` or `.config`

If you have your own module that does not use `.run` or `.config`, you can avoid the use of `ngload` as any module
created after bootstrap will support on-demand loading.  For example:

**common.js**
```Javascript
define(['ngload!restangular'], function() {
    return angular.module('common', ['restangular']);
});
```

**user.js**
```Javascript
define(['common'], function(common) {
    common.factory("User", function () { ... });
});
```

**controller/home_ctrl**
```Javascript
define(['app', 'user'], function(app) {
    app.controller("HomeCtrl", ["$scope", "User", function ($scope, User) {
        ...
    }]);
});
```

In this example, the `user` package does not need to be loaded in the `app.js` as it's loaded on demand when `HomeCtrl` is called.

Running Sample Project
==========

Prerequisites:
* node and npm
* grunt-cli installed globally as per [Grunt Getting started](http://gruntjs.com/getting-started).

Run the following command after cloning this project:

```bash
npm install
grunt build
grunt serve-www
```
* The default build will test angularAMD using following browsers: 'PhantomJS', 'Chrome' and 'Firefox'

History
==========
This project was inpired by [Dan Wahlin's blog](http://weblogs.asp.net/dwahlin/archive/2013/05/22/dynamically-loading-controllers-and-views-with-angularjs-and-requirejs.aspx)
where he explained the core concept of what is needed to make RequireJS works with AngularJS.  It is a *must* read
if you wish to better understand implementation detail of `angularAMD`.

As I started to implement RequireJS in my own project, I got stuck trying to figure out how to load my existing modules
without re-writting them.  After exhausive search with no satisfactory answer, I posted following question on 
[StackOverflow](http://stackoverflow.com/questions/19134023/lazy-loading-angularjs-modules-with-requirejs).
[Nikos Paraskevopoulos](http://stackoverflow.com/users/2764255/nikos-paraskevopoulos) was kind enough to share his
solution with me but his implementation did not handle `.config` method calls and out of order definition in modules.
However, his implementation gave me the foundation I needed to create `angularAMD` and his project is where the idea
for `alt_angular` came from.


References
==========

* [Dynamically Loading Controllers and Views with AngularJS and RequireJS](http://weblogs.asp.net/dwahlin/archive/2013/05/22/dynamically-loading-controllers-and-views-with-angularjs-and-requirejs.aspx) by Dan Wahlin
* [Dependency Injection using RequireJS & AngularJS](http://solutionoptimist.com/2013/09/30/requirejs-angularjs-dependency-injection/) by Thomas Burleson
* [Lazy loading AngularJS modules with RequireJS](http://stackoverflow.com/questions/19134023/lazy-loading-angularjs-modules-with-requirejs) stackoverflow
* [angular-require-lazy](https://github.com/nikospara/angular-require-lazy) by Nikos Paraskevopoulos
