/*jslint node: true, vars: true, nomen: true */
/*globals define, angular */

define(['angular'], function () {
    var ngAMD = {},
        orig_angular,
        alternate_queue = [],
        app_injector,
        app_cached_providers = {};
    
    /**
     * Return route for given controller and set the resolver to instantiate defined controller.
     * controller_path is needed to allow requirejs to find the code for controller.  If the path
     * to controller is defined in require.config, it can then be omitted.
     *
     * @param: {string} templateURL:     Path to the html template
     * @param: {string} controller:      Name of the controller to use
     * @param: {string} controller_path: Path to the controller to be loaded that requirejs will understand.
     *                                   If not provided, will attempt to load using @controller
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
    ngAMD.processQueue = function () {
        // Process alternate queue in FIFO fashion
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
                    var cachedProvider = app_cached_providers[provider];
                    //console.log("'" + item.name + "': applying " + provider + "." + method + " for args: ", args);
                    cachedProvider[method].apply(null, args);
                }

            }
            
            // Execute the run block of the module
            if (item.module._runBlocks) {
                angular.forEach(item.module._runBlocks, function processRunBlock(block) {
                    var injector = app_cached_providers.$injector;
                    //console.log("'" + item.name + "': executing run block: ", run_block);
                    injector.invoke(block);
                });
            }
            
            // How to remove the module??? 
            orig_angular.module(item.name, [], orig_angular.noop);
        }

    };
    
    /**
     * Return cached app injector
     */
    ngAMD.getCachedProvider = function (provider_name) {
        // Hack used for unit testing that orig_angular has been captured
        if (provider_name === "__orig_angular") {
            return orig_angular;
        } else {
            return app_cached_providers[provider_name];
        }
    };
    
    /**
     * Create inject function that uses cached $injector.
     * Designed primarly to be used during unit testing.
     */
    ngAMD.inject = function () {
        return app_injector.invoke.apply(null, arguments);
    };
    
    /**
     * Create an alternate angular so that subsequent call to angular.module will queue up
     * the module created for later processing via the .processQueue method. 
     * 
     * This delaying processing is needed as angular does not recognize any newly created
     * module after angular.bootstrap has ran.  The only way to add new objects to angular
     * post bootstrap is using cached provider.
     * 
     * Once the modules has been queued, processQueue would then use each module's _invokeQueue
     * and _runBlock to recreate object using cached $provider.  In essence, creating a dumplite
     * object into the current ng-app.  As result, if there are subsequent call to retrieve the
     * module post processQueue, it would retrieve a module that is not integrated into the ng-app.
     * 
     * Therefore, any subsequent angular.module call to retrieve the module created with alternate
     * angular will return undefined.
     * 
     */
    ngAMD.getAlternateAngular = function () {
        var alternateAngular = {}, alternateModules = {};
        
        orig_angular.extend(alternateAngular, orig_angular);
        
        // Custom version of angular.module used as cache
        alternateAngular.module = function (name, requires) {
            
            if (typeof requires === "undefined") {
                // Return undefined if module was created using the alternateAngular
                if (alternateModules.hasOwnProperty(name)) {
                    return undefined;
                } else {
                    return orig_angular.module(name);
                }
                
            } else {
                //console.log("alternateAngular.module START for '" + name + "': ", arguments);
                var orig_mod = orig_angular.module.apply(null, arguments),
                    item = { name: name, module: orig_mod};
                alternate_queue.push(item);
                alternateModules[name] = orig_mod;
                return orig_mod;
            }
        };
                
        return alternateAngular;
    };
    
    /**
     * Initialization of angularAMD.  The objective is to cache the $provider and $injector from the app
     * to be used later.
     */
    return function (app) {
        // Store the original angular
        orig_angular = angular;
        // Cache provider needed
        app.config(
            ['$controllerProvider', '$compileProvider', '$filterProvider', '$animateProvider', '$provide', function (controllerProvider, compileProvider, filterProvider, animateProvider, provide) {
                // Cache Providers
                app_cached_providers = {
                    $controllerProvider: controllerProvider,
                    $directive: compileProvider,
                    $filter: filterProvider,
                    $animateProvider: animateProvider,
                    $provide: provide
                };
                
                // Create a app.register object
                app.register = {
                    controller: controllerProvider.register,
                    directive: compileProvider.directive,
                    filter: filterProvider.register,
                    factory: provide.factory,
                    service: provide.service,
                    constant: provide.constant,
                    value: provide.value,
                    animation: animateProvider.register
                };
            
            }]
        );
        
        // Get the injector for the app
        app.run(function ($injector) {
            // $injector must be obtained in .run instead of .config
            app_injector = $injector;
            app_cached_providers.$injector = app_injector;
        });
        
        // Create a property to store ngAMD on app
        app.ngAMD = ngAMD;
        
        // Return the angularAMD object
        return ngAMD;
    };
    
});
