define(function () {
    var ngAMD = {}, app_register, orig_angular;
    
    /**
     * Creating a replica of angular's module function.  Not a perfect implementation
     * REF: angular.js:1324 (1.2.0-rc.2)
     *
     * Lazy Angular works by basically replacing the angular.module to a custom version
     * that calls the cached provider created during th config phaze of the app.
     *
     * By replacing the window.angular version, the lazy loaded module are created using
     * the cached $provider instead of the native version.
     *
     * Problems:
     * 1. Cannot run angular.module(...).config
     * 2. Order that .factory/.service etc is called matters
     *
     * The lazyAngular is therefore a proxy to the cached $provider
    */
    function makeLazyModule(name, requires, configFn) {
        // console.log("Creating lazyModule '" + name + "' with deps:", requires);

        function notImplemented(name) {
            throw new Error("'module(...)." + name + "' not implemented in angularAMD.");
        }
        
		var lazyModule = {
            _invokeQueue: [],
            _runBlocks: [],
            requires: requires,
            name: name,
            provider: function () {
				app_register.provider(arguments);
				return lazyModule;
			},
			factory: function () {
				app_register.factory.apply(null, arguments);
				return lazyModule;
			},
            service: function () {
				app_register.service.apply(null, arguments);
				return lazyModule;
            },
            value: function () {
				app_register.value.apply(null, arguments);
				return lazyModule;
            },
            constant: function () {
				app_register.constant.apply(null, arguments);
				return lazyModule;
            },
            animation: function () {
                app_register.animation.apply(null, arguments);
            },
			filter: function () {
				app_register.filter.apply(null, arguments);
				return lazyModule;
			},
			controller: function () {
				app_register.controller.apply(null, arguments);
				return lazyModule;
			},
			directive: function () {
				app_register.directive.apply(null, arguments);
				return lazyModule;
			},
            //config: notImplemented("config"),
			run: function (r) {
				this._runBlocks.push(r);
				return lazyModule;
			}
		};
		return lazyModule;
	}
    
    /**
     * Return route for given controller.
     *
     * @templateURL:     Path to the html template
     * @controller:      Name of the controller to use
     * @controller_path: Path to the controller to be loaded that requirejs will understand.
     *                   If not provided, will attempt to load using @controller
     */
    ngAMD.route = function (templateURL, controller, controller_path) {
        var req_dep = controller_path || controller;
        return {
            templateUrl: templateURL,
            controller: controller,
            resolve: {
                load: ['$q', '$rootScope', function ($q, $rootScope) {
                    var defer = $q.defer();
                    require([req_dep], function () {
                        defer.resolve();
                        $rootScope.$apply();
                    });
                    return defer.promise;
                }]
            }
        };
    };
    
    var lazyAngular = {}, lazyModules = {};
    ngAMD.lazyAngularModule = function () {
        orig_angular.extend(lazyAngular, orig_angular);

        lazyAngular.module = function(name, requires, configFn) {
            var ret;
            if( typeof(requires) === "undefined" ) {
                if( lazyModules.hasOwnProperty(name) ) {
                    ret = lazyModules[name];
                } else {
                    ret = orig_angular.module(name);
                }
            } else {
                if( configFn != null ) throw new Error("config function unimplemented yet, module: " + name);
                ret = makeLazyModule(name, requires, configFn);
                lazyModules[name] = ret;
            }
            return ret;
        };
                
        return lazyAngular;
    }
    
    
    return function (app) {
        // Store the original angular
        orig_angular = angular;
        // Cache provider needed
        app.config(
            ['$controllerProvider', '$compileProvider', '$filterProvider', '$animateProvider', '$provide', function (controllerProvider, compileProvider, filterProvider, animateProvider, provide) {
                // Create a app.register object
                app_register = {
                    controller: controllerProvider.register,
                    directive: compileProvider.directive,
                    filter: filterProvider.register,
                    factory: provide.factory,
                    service: provide.service,
                    constant: provide.constant,
                    value: provide.value,
                    animation: animateProvider.register
                };
                app.register = app_register;
            
            }]
        );
        // Return the angularAMD object
        return ngAMD;
    };
    
});
