define(['angular-route'], function () {

    var app = angular.module("ngreq-app", ['ngRoute']);

    function resolveController(names) {
        return {
            load: ['$q', '$rootScope', function ($q, $rootScope) {
                var defer = $q.defer();
                require(names, function () {
                    defer.resolve();
                    $rootScope.$apply();
                });
                return defer.promise;
            }]
        }
    }
    
    app.config(
        ['$routeProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
         function ($routeProvider, $controllerProvider, $compileProvider, $filterProvider, $provide) {

        app.register = {
            controller: $controllerProvider.register,
            directive: $compileProvider.directive,
            filter: $filterProvider.register,
            factory: $provide.factory,
            service: $provide.service
        };
        

        
        $routeProvider
            .when("/view1", {
                templateUrl: "views/view1.html", controller: "View1Controller",
                resolve: resolveController(["View1Controller"])
            })
            .when("/view2", {
                templateUrl: "views/view2.html", controller: "View2Controller",
                resolve: resolveController(["View2Controller"])
            })
            .when("/view3", {
                templateUrl: "views/view3.html", controller: "View3Controller",
                resolve: resolveController(["customDirectives", "View3Controller"])
            })
            .otherwise({redirectTo: '/view1'})
    }]);

    /*
    Lazy Angular works by basically replacing the angular.module to a custom version
    that calls the cached provider created during th config phaze of the app.
    
    By replacing the window.angular version, the lazy loaded module are created using
    the cached $provider instead of the native version.
    
    The lazyAngular is therefore a proxy to the cached $provider
    */
    var eagerAngular = angular, lazyAngular = {}, lazyModules = {};
    
	function makeLazyModule(name) {
		var lazyModule = {
			name: name,
			__runBlocks: [],
			factory: function() {
				app.register.factory.apply(null, arguments);
				return lazyModule;
			},
			directive: function() {
				app.register.directive.apply(null, arguments);
				return lazyModule;
			},
			filter: function() {
				app.register.filter.apply(null, arguments);
				return lazyModule;
			},
			controller: function() {
				app.register.controller.apply(null, arguments);
				return lazyModule;
			},
			provider: function() {
				app.register.provider.apply(null, arguments);
				return lazyModule;
			},
			run: function(r) {
				this.__runBlocks.push(r);
				return lazyModule;
			}
			// TODO Implement the rest of the angular.module interface
		};
		return lazyModule;
	}

    // Create a copy of (extend) angular
    angular.extend(lazyAngular, angular);
    
    lazyAngular.module = function(name, requires, configFn) {
        var ret, realModule;
        if( typeof(requires) === "undefined" ) {
            if( lazyModules.hasOwnProperty(name) ) {
                ret = lazyModules[name];
            } else {
                ret = eagerAngular.module(name);
            }
        } else {
            if( configFn != null ) throw new Error("config function unimplemented yet, module: " + name);
            ret = makeLazyModule(name);
            lazyModules[name] = ret;
        }
        return ret;
    };
    window.angular = lazyAngular;
    
    return app;
});