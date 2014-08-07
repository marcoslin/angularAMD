define(['angularAMD', 'test/unit/factory/utestProvider'], function (angularAMD, utestProvider) {

    return function (result) {
        var inject = angularAMD.inject;

        utestProvider(result);

        /*
        There is a problem with having a describe outside of utestProvider
        If there is an error, it will always use the title of the last
        test in the `utestProvider`
         */
        describe("Utest " + result.suffix + " Modules", function () {
            it(".config check.", inject([result.UtestStoreResult, function (UtestStoreResult) {
                if (UtestStoreResult === "undefined") {
                    console.log("### ERROR on " + result.suffix + ": ", result.config_name);
                }
                expect(UtestStoreResult).toBe(result.config_name);
            }]));

            it(".run check.", inject(function ($rootScope) {
                expect($rootScope.run_name).toBe(result.run_name);
            }));
        });



    };

});