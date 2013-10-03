define(function () {
    var ngAMD = {}, app_register;
    
    /**
     * Creating a replica of angular's module function.  Not a perfect implementation
     * REF: angular.js:1324 (1.2.0-rc.2)
     */
    function makeLazyModule(name) {
        var invokeQueue = [],
            runBlocks = [];
        
        function notImplemented(name) {
            throw new Error("'module(...)." + name + "' not implemented in angularAMD.");
        }
        
        function invokeLater(provider, method, insertMethod) {
            return function () {
                invokeQueue[insertMethod || 'push']([provider, method, arguments]);
                return moduleInstance;
            };
        }
        
		var lazyModule = {
            _invokeQueue: [],
            _runBlocks: [],
            requires: notImplemented("requires"),
            name: name,
            provider: function () {
				app_register.provider.apply(null, arguments);
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
            config: notImplemented("config"),
			run: function (r) {
				this._runBlocks.push(r);
				return lazyModule;
			}
		};
		return lazyModule;
	}

    function resolveController(name) {
        return {
            load: ['$q', '$rootScope', function ($q, $rootScope) {
                var defer = $q.defer();
                require([name], function () {
                    defer.resolve();
                    $rootScope.$apply();
                });
                return defer.promise;
            }]
        };
    }
    
    ngAMD.route = function (template, controller, controller_path) {
        //pass
    };
    

    
    
    return function (app) {
        app.config(['$controllerProvider', '$compileProvider', '$filterProvider', '$animateProvider', '$provide',
                    function (controllerProvider, compileProvider, filterProvider, animateProvider, provide) {
                        
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
            
        }]);
        return ngAMD;
    };
    
});