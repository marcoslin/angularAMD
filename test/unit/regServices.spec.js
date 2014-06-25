/**
 * Simulate 3rd party
 */
define(['app', 'regServices', 'test/unit/factory/utestProvider' ], function (app, regServices, unitestFactory) {
    console.log("* Running regServices.spec.js");
    unitestFactory(regServices);
});
