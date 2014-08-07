/**
 * A standard set of code used to simulate creation of independent modules, leveraging `provider` factory.
 * Basically, it will do everything `provider` factory do and setup .run and .config blocks.
 */
define(["test/unit/factory/provider"], function (providerFactory) {
    /**
     * A function that will create different AngularJS provider for the given module.
     * All module name created will has a suffix
     */
    return function (module, suffix) {
        var result = providerFactory(module, suffix);

        /*
         Use the .config block to set the test provider's value
         Use the .run block to set value for $rootScope.run_name
         */
        result.config_name = "module.config YzmACpEVW9" + suffix;
        result.run_name = "module.run YzmACpEVW9"  + suffix;
        module
            .config([result.UtestStoreProvider, function (UtestStoreProvider) {
                UtestStoreProvider.configureValue(result.config_name);
            }])
            .run(function ($rootScope) {
                $rootScope.run_name = result.run_name;
            });

        /*
         Return result
         */
        return result;
    };

});

