/**
 * A standard set of code used to create different AngularJS provider.  They considerations:
 * 1. Out of sequence creation: .value and .constant used by .factory and .service are created later
 * 2. config block is tested by using a custom provider UtestStore and result given by a UtestStoreResult
 *
 * `module` object is used to create provider and `suffix` is used as part of the name of provider to
 * make it unique.  A `result` object is returned with name of provider created and the expected value
 * associated with that provider.
 */
define(function () {
    /**
     * A function that will create different AngularJS provider for the given module.
     * All module name created will has a suffix
     */
    return function (module, suffix) {
        var result = { suffix: suffix };

        /*
         Create Test Provider to store configuration value and a associated .factory
         to return the value stored in the .config block
         */
        result.UtestStore = "UtestStore" + suffix;
        result.UtestStoreProvider = "UtestStore" + suffix + "Provider";
        module.provider(result.UtestStore, function () {
            var config_value;

            this.configureValue = function(value) {
                config_value = value;
            };

            this.$get = function () {
                return {
                    getValue: function () {
                        return config_value;
                    }
                };
            };
        });

        result.UtestStoreResult = 'UtestStoreResult' + suffix;
        module.factory(result.UtestStoreResult, [result.UtestStore, function (UtestStore) {
            return UtestStore.getValue();
        }]);

        /*
         Use the .config block to set the test provider's value
         */
        result.config_name = "module.config SDkWRXOgII" + suffix;
        module.config([result.UtestStoreProvider, function (UtestStoreProvider) {
            UtestStoreProvider.configureValue(result.config_name);
        }]);

        /*
         Use the .run block to set value for $rootScope.run_name
         */
        result.run_name = "module.run sOdq6GNsaW"  + suffix;
        module.run(function ($rootScope) {
            $rootScope.run_name = result.run_name;
        });

        /*
         Create a .factory using the UtestConstant declared later
         */
        result.UtestConstant = "UtestConstant" + suffix;
        result.UtestFactory = "UtestFactory" + suffix;
        result.factory_name = "UtestFactory.name nSg56eHrWo" + suffix;
        module.factory(result.UtestFactory, [result.UtestConstant, function (UtestConstant) {
            // Make sure that constant_name is setup after this factory.
            return { name: result.factory_name, const_name: UtestConstant };
        }]);

        /*
         Create a .service using the UtestValue declared later
         */
        result.UtestValue = "UtestValue" + suffix;
        result.UtestService = "UtestService" + suffix;
        result.service_name = "UtestService.name ySg56eHrWo" + suffix;
        module.service(result.UtestService, ["UtestValue" + suffix, function (UtestValue) {
            // Make sure that value_name is defined after this service
            this.name = result.service_name;
            this.val_name = UtestValue;
        }]);

        /*
        Define out of sequence constant and value, used by .factory and .service earlier
         */
        result.constant_name = "utestmod.constant_name xHf71eVzxd" + suffix;
        module.constant(result.UtestConstant, result.constant_name);

        result.value_name = "utestmod.value_name ih3zRvZofo" + suffix;
        module.value(result.UtestValue, result.value_name);

        /*
         Create .directive.  The name of directive is different as for consumer, it has to
         be converted to - based from the Camel case.
         */
        result.utestDirective = "utest-directive-" + suffix.toLowerCase();
        result.directive_name = "utestmod.directive_name Krloe7G1CH" + suffix;
        module.directive('utestDirective' + suffix, function () {
            return {
                restrict: 'A',
                link: function (scope, elm, attr) {
                    elm.text(result.directive_name);
                }
            };
        });

        /*
         Create .filter
         */
        result.utestFilter = 'utestFilter' + suffix;
        result.filter_name = "utestmod.filter_name 0WWb0usFCB" + suffix;
        module.filter(result.utestFilter, function () {
            return function (input) {
                return input + " " + result.filter_name;
            };
        });


        /*
         Create .animation
         */
        result.utestAnimation = ".animation-" + suffix.toLowerCase();
        module.animation(result.utestAnimation, function ($log, $interval) {
            return {
                addClass : function(element, className, done) {
                    if ( className === "custom-hide") {
                        element.css('opacity',0);
                        done();
                    }
                },
                removeClass : function(element, className, done) {
                    if ( className === "custom-hide") {
                        element.css('opacity',1);
                        done();
                    }
                }
            };
        });

        /*
         Return result
         */
        return result;
    };

});

