define(['angular-route'], function () {

    var app = angular.module("ngreq-app", ['ngRoute']);
    var eagerAngular = angular, lazyAngular = {}, cachedInternals = {}, lazyModules = {};
    
	function makeLazyModule(name, cachedInternals) {
		var lazyModule = {
			name: name,
			realModule: null,
			__runBlocks: [],
			factory: function() {
				cachedInternals.$provide.factory.apply(null, arguments);
				return lazyModule;
			},
			directive: function() {
				cachedInternals.$compileProvider.directive.apply(null, arguments);
				return lazyModule;
			},
			filter: function() {
				cachedInternals.$filterProvider.register.apply(null, arguments);
				return lazyModule;
			},
			controller: function() {
				cachedInternals.$controllerProvider.register.apply(null, arguments);
				return lazyModule;
			},
			provider: function() {
				cachedInternals.$provide.provider.apply(null, arguments);
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
    
    app.config(['$routeProvider', '$controllerProvider', '$filterProvider', '$compileProvider', '$provide', function ($routeProvider, $controllerProvider, $filterProvider, $compileProvider, $provide) {
        
        cachedInternals.$provide = $provide;
        cachedInternals.$compileProvider = $compileProvider;
        cachedInternals.$filterProvider = $filterProvider;
        cachedInternals.$controllerProvider = $controllerProvider;
        
        app.register = {
            controller: $controllerProvider.register,
            factory: $provide.factory,
            directive: $compileProvider.directive
        };
        
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
    angular.extend(lazyAngular, eagerAngular);
    console.log("lazyAngular: ", lazyAngular);
    
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
            ret = makeLazyModule(name, cachedInternals);
            lazyModules[name] = ret;
            //ret.realModule = eagerAngular.module(name, requires, configFn);
            //eagerAngular.module(name, requires, configFn);
        }
        return ret;
    };
    window.angular = lazyAngular;
    
    return app;
});