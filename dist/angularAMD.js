/*!
 angularAMD v0.2.0-rc.1
 (c) 2013-2014 Marcos Lin https://github.com/marcoslin/
 License: MIT
*/
define(function () {
    var bootstrapped = false,

        // Used in .bootstrap
        app_name,
        orig_app,
        alt_app,
        run_injector,
        config_injector,
        app_cached_providers = {},

        // Used in setAlternateAngular(), alt_angular is set to become angular.module
        orig_angular,
        alt_angular,

        // Object that wrap the provider methods that enables lazy loading
        onDemandLoader = {},
        preBootstrapLoaderQueue = [],

        // Used in setAlternateAngular() and .processQueue
        alternate_modules = {},
        alternate_modules_tracker = {},
        alternate_queue = [],

        // Used by angularAMD provider methods and .bootstrap
        deferred_providers = [];
    
    // Private method to check if angularAMD has been initialized
    function checkBootstrapped() {
        if ( !bootstrapped ) {
            throw Error("angularAMD not initialized.  Need to call angularAMD.bootstrap(app) first.");
        }
    }

    /**
     * Create an alternate angular so that subsequent call to angular.module will queue up
     * the module created for later processing via the .processQueue method. 
     * 
     * This delaying processing is needed as angular does not recognize any newly created
     * module after angular.bootstrap has ran.  The only way to add new objects to angular
     * post bootstrap is using cached provider.
     * 
     * Once the modules has been queued, processQueue would then use each module's _invokeQueue
     * and _runBlock to recreate object using cached $provider.  In essence, creating a duplicate
     * object into the current ng-app.  As result, if there are subsequent call to retrieve the
     * module post processQueue, it would retrieve a module that is not integrated into the ng-app.
     * 
     * Therefore, any subsequent to call to angular.module after processQueue should return undefined
     * to prevent obtaining a duplicated object.  However, it is critical that angular.module return
     * appropriate object *during* processQueue.
     */
    function setAlternateAngular() {
        // This method cannot be called more than once
        if (alt_angular) {
            throw Error("setAlternateAngular can only be called once.");
        } else {
            alt_angular = {};
        }

        // Make sure that bootstrap has been called
        checkBootstrapped();

        // Create a a copy of orig_angular with on demand loading capability
        orig_angular.extend(alt_angular, orig_angular);

        // Custom version of angular.module used as cache
        alt_angular.module = function (name, requires) {
            if (typeof requires === "undefined") {
                // Return module from alternate_modules if it was created using the alt_angular
                if (alternate_modules_tracker.hasOwnProperty(name)) {
                    return alternate_modules[name];
                } else {
                    return orig_angular.module(name);
                }
            } else {
                var orig_mod = orig_angular.module.apply(null, arguments),
                    item = { name: name, module: orig_mod};
                alternate_queue.push(item);
                orig_angular.extend(orig_mod, onDemandLoader);
                
                /*
                Use `alternate_modules_tracker` to track which module has been created by alt_angular
                but use `alternate_modules` to cache the module created.  This is to simplify the
                removal of cached modules after .processQueue.
                */
                alternate_modules_tracker[name] = true;
                alternate_modules[name] = orig_mod;
                
                // Return created module
                return orig_mod;
            }
        };
                
        window.angular = alt_angular;
    }

    // Constructor
    function angularAMD() {}
    
    
    /**
     * Helper function to generate angular's $routeProvider.route.  'config' input param must be an object.
     * 
     * Populate the resolve attribute using either 'controllerUrl' or 'controller'.  If 'controllerUrl'
     * is passed, it will attempt to load the Url using requirejs and remove the attribute from the config
     * object.  Otherwise, it will attempt to populate resolve by loading what's been passed in 'controller'.
     * If neither is passed, resolve is not populated.
     *
     * This function works as a pass-through, meaning what ever is passed in as 'config' will be returned,
     * except for 'controllerUrl' attribute.
     *
     */
    angularAMD.prototype.route = function (config) {
        // Initialization not necessary to call this method.
        var load_controller;

        /*
        If `controllerUrl` is provided, load the provided Url using requirejs.  If `controller` is not provided
        but `controllerUrl` is, assume that module to be loaded will return a function to act as controller.

        Otherwise, attempt to load the controller using the controller name.  In the later case, controller name
        is expected to be defined as one of 'paths' in main.js.
        */
        if ( config.hasOwnProperty("controllerUrl") ) {
            load_controller = config.controllerUrl;
            delete config.controllerUrl;
            if (typeof config.controller === "undefined") {
                // Only controllerUrl is defined.  Attempt to set the controller to return value of package loaded.
                config.controller = [
                    "$scope", "__AAMDCtrl", "$injector",
                    function ($scope, __AAMDCtrl, $injector) {
                        if (typeof __AAMDCtrl !== "undefined" ) {
                            $injector.invoke(__AAMDCtrl, this, { "$scope": $scope });
                        }
                    }
                ];
            }
        } else if (typeof config.controller === 'string') {
            load_controller = config.controller;
        }
        
        // If controller needs to be loaded, append to the resolve property
        if (load_controller) {
            var resolve = config.resolve || {};
            resolve['__AAMDCtrl'] = ['$q', '$rootScope', function ($q, $rootScope) { // jshint ignore:line
                var defer = $q.defer();
                require([load_controller], function (ctrl) {
                    defer.resolve(ctrl);
                    $rootScope.$apply();
                });
                return defer.promise;
            }];
            config.resolve = resolve;
        }

        return config;
    };
    
    
    /**
     * Expose name of the app that has been bootstrapped
     */
    angularAMD.prototype.appname = function () {
        checkBootstrapped();
        return app_name;
    };
    
    
    /**
     * Recreate the modules created by alternate angular in ng-app using cached $provider.
     * As AMD loader does not guarantee the order of dependency in a require([...],...)
     * clause, user must make sure that dependecies are clearly setup in shim in order
     * for this to work.
     *
     * HACK ALERT:
     * This method relay on inner working of angular.module code, and access _invokeQueue
     * and _runBlock private variable.  Must test carefully with each release of angular.
     */
    angularAMD.prototype.processQueue = function () {
        checkBootstrapped();
        
        if (typeof alt_angular === 'undefined') {
            throw Error("Alternate angular not set.  Make sure that `enable_ngload` option has been set when calling angularAMD.bootstrap");
        }
        
        // Process alternate queue in FIFO fashion
        function processRunBlock(block) {
            //console.info("'" + item.name + "': executing run block: ", run_block);
            run_injector.invoke(block);
        }

        while (alternate_queue.length) {
            var item = alternate_queue.shift(),
                invokeQueue = item.module._invokeQueue,
                y;

            // Setup the providers define in the module
            for (y = 0; y < invokeQueue.length; y += 1) {
                var q = invokeQueue[y],
                    provider = q[0],
                    method = q[1],
                    args = q[2];
                
                if (app_cached_providers.hasOwnProperty(provider)) {
                    var cachedProvider;
                    if (provider === "$injector" && method === "invoke") {
                        cachedProvider = config_injector;
                    } else {
                        cachedProvider = app_cached_providers[provider];
                    }
                    // console.info("'" + item.name + "': applying " + provider + "." + method + " for args: ", args);
                    cachedProvider[method].apply(null, args);
                } else {
                    console.error("'" + provider + "' not found!!!");
                }

            }
            
            // Execute the run block of the module
            if (item.module._runBlocks) {
                angular.forEach(item.module._runBlocks, processRunBlock);
            }
            
            /*
            Clear the cached modules created by alt_angular so that subsequent call to
            angular.module will return undefined.
            */
            alternate_modules = {};
        }

    };
    
    
    /**
     * Return cached app provider
     */
    angularAMD.prototype.getCachedProvider = function (provider_name) {
        checkBootstrapped();
        // Hack used for unit testing that orig_angular has been captured
        var cachedProvider;

        switch(provider_name) {
            case "__orig_angular":
                cachedProvider = orig_angular;
                break;
            case "__alt_angular":
                cachedProvider = alt_angular;
                break;
            case "__orig_app":
                cachedProvider = orig_app;
                break;
            case "__alt_app":
                cachedProvider = alt_app;
                break;
            default:
                cachedProvider = app_cached_providers[provider_name];
        }

        return cachedProvider;
    };
    
    /**
     * Create inject function that uses cached $injector.
     * Designed primarly to be used during unit testing.
     */
    angularAMD.prototype.inject = function () {
        checkBootstrapped();
        return run_injector.invoke.apply(null, arguments);
    };


    /**
     * Create config function that uses cached config_injector.
     * Designed to simulate app.config.
     */
    angularAMD.prototype.config = function () {
        checkBootstrapped();
        return config_injector.invoke.apply(null, arguments);
    };
    
    /**
     * Reset angularAMD for resuse
     */
    angularAMD.prototype.reset = function () {
        if (typeof orig_angular === 'undefined') {
            return;
        }
        
        // Restore original angular instance
        window.angular = orig_angular;

        // Clear stored app
        orig_app = undefined;
        alt_app = undefined;

        // Clear original angular
        alt_angular = undefined;
        orig_angular = undefined;
        onDemandLoader = {};
        preBootstrapLoaderQueue = [];

        // Clear private variables
        alternate_queue = [];
        app_name = undefined;
        run_injector = undefined;
        config_injector = undefined;
        app_cached_providers = {};

        // Clear bootstrap flag but there is no way to un-bootstrap AngularJS
        bootstrapped = false;
    };
    
    /**
     * Initialization of angularAMD that bootstraps AngularJS.  The objective is to cache the
     * $provider and $injector from the app to be used later.
     *
     * enable_ngload: 
     */
    angularAMD.prototype.bootstrap = function (app, enable_ngload, elem) {
        // Prevent bootstrap from being called multiple times
        if (bootstrapped) {
            throw Error("bootstrap can only be called once.");
        }

        if (typeof enable_ngload === 'undefined') {
            enable_ngload = true;
        }

        // Store reference to original angular and app
        orig_angular = angular;

        // Create new version of app
        orig_app = app;
        alt_app = {};
        orig_angular.extend(alt_app, orig_app);

        // Determine element to bootstrap angular
        elem = elem || document.documentElement;
        
        // Cache provider needed
        app.config(
            ['$controllerProvider', '$compileProvider', '$filterProvider', '$animateProvider', '$provide', '$injector', function (controllerProvider, compileProvider, filterProvider, animateProvider, provide, injector) {
                // Cache Providers
                config_injector = injector;
                app_cached_providers = {
                    $controllerProvider: controllerProvider,
                    $compileProvider: compileProvider,
                    $filterProvider: filterProvider,
                    $animateProvider: animateProvider,
                    $provide: provide
                };

                // Substitue provider methods from app call the cached provider
                angular.extend(onDemandLoader, {
                    provider : function(name, constructor) {
                        provide.provider(name, constructor);
                        return this;
                    },
                    controller : function(name, constructor) {
                        controllerProvider.register(name, constructor);
                        return this;
                    },
                    directive : function(name, constructor) {
                        compileProvider.directive(name, constructor);
                        return this;
                    },
                    filter : function(name, constructor) {
                        filterProvider.register(name, constructor);
                        return this;
                    },
                    factory : function(name, constructor) {
                        // console.log("onDemandLoader.factory called for " + name);
                        provide.factory(name, constructor);
                        return this;
                    },
                    service : function(name, constructor) {
                        provide.service(name, constructor);
                        return this;
                    },
                    constant : function(name, constructor) {
                        provide.constant(name, constructor);
                        return this;
                    },
                    value : function(name, constructor) {
                        provide.value(name, constructor);
                        return this;
                    },
                    animation: angular.bind(animateProvider, animateProvider.register)
                });
                angular.extend(alt_app, onDemandLoader);

            }]
        );
        
        // Get the injector for the app
        app.run(['$injector', function ($injector) {
            // $injector must be obtained in .run instead of .config
            run_injector = $injector;
            app_cached_providers.$injector = run_injector;
        }]);
        
        // Store the app name needed by .bootstrap function.
        app_name = app.name;

        // If there are angular provider recipe queued up, process it
        if (preBootstrapLoaderQueue.length > 0) {
            for (var iq = 0; iq < preBootstrapLoaderQueue.length; iq += 1) {
                var item = preBootstrapLoaderQueue[iq];
                orig_app[item.recipe](item.name, item.const);
            }
            preBootstrapLoaderQueue = [];
        }

        // Create a app.register object to keep backward compatibility
        orig_app.register = onDemandLoader;

        // Bootstrap Angular
        orig_angular.element(document).ready(function () {
            orig_angular.bootstrap(elem, [app_name]);
            // Indicate bootstrap completed
            bootstrapped = true;

            // Replace angular.module
            if (enable_ngload) {
                //console.info("Setting alternate angular");
                setAlternateAngular();
            }
        });

        // Return app
        return alt_app;
    };

    // Define provider
    function executeProvider(providerRecipe) {
        return function (name, constructor) {
            if (bootstrapped) {
                onDemandLoader[providerRecipe](name, constructor);
            } else {
                // Queue up the request to be used during .bootstrap
                preBootstrapLoaderQueue.push({
                    "recipe": providerRecipe,
                    "name": name,
                    "const": constructor
                });
            }
            return this;
        };
    }

    // .provider
    angularAMD.prototype.provider = executeProvider("provider");
    // .controller
    angularAMD.prototype.controller = executeProvider("controller");
    // .directive
    angularAMD.prototype.directive = executeProvider("directive");
    // .filter
    angularAMD.prototype.filter = executeProvider("filter");
    // .factory
    angularAMD.prototype.factory = executeProvider("factory");
    // .service
    angularAMD.prototype.service = executeProvider("service");
    // .constant
    angularAMD.prototype.constant = executeProvider("constant");
    // .value
    angularAMD.prototype.value = executeProvider("value");
    // .animation
    angularAMD.prototype.animation = executeProvider("animation");

    // Create a new instance and return
    return new angularAMD();
    
});
