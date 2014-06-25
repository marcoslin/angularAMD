define(['angularAMD', 'test/unit/factory/utestProvider'], function (angularAMD, utestProvider) {

    return function (result) {
        var inject = angularAMD.inject;

        utestProvider(result);

        describe("Utest " + result.suffix + " Modules", function () {
            it(".config check.", inject([result.UtestStoreResult, function (UtestStoreResult) {
                expect(UtestStoreResult).toBe(result.config_name);
            }]));

            it(".run check.", inject(function ($rootScope) {
                expect($rootScope.run_name).toBe(result.run_name);
            }));
        });

    };

});