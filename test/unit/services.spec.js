/**
 * Test with 2 main objectives:
 * 1. Make sure that ngAMD's cache provider works
 * 2. Make sure that independent angular.modules can be incorporated in the project
 *    by using the ngAMD.processQueue() method to load these modules.
 */
define(['app', 'angularAMD', 'test/unit/factory/utestModule', 'ngload!services'], function (app, angularAMD, utestModule) {
    console.log("* Running services.spec.js");
    var results,
        inject = angularAMD.inject;

    inject(function (UtestServiceResult) {
        results = UtestServiceResult;
    });

    utestModule(results);

    describe('Utest Services', function () {
        it("sub module check.", inject([results.UtestSubModule, function (UtestSubModule) {
            expect(UtestSubModule.get()).toBe(results.sub_module);
        }]));
        
        it("sub module check module.", function () {
            expect(angular.module("subModuleServices")).toBeUndefined();
        });

        it("angularAMD.config check.", function () {
            var configVal = "B9NmTuDAeU-JO0S1yjKXc";
            inject([results.UtestStore, function (UtestStore) {
                expect(UtestStore.getValue()).not.toBe(configVal);
            }]);
            angularAMD.config([results.UtestStoreProvider, function (UtestStoreProvider) {
                UtestStoreProvider.configureValue(configVal);
            }]);
            inject([results.UtestStore, function (UtestStore) {
                expect(UtestStore.getValue()).toBe(configVal);
            }]);

        });

    });
});
