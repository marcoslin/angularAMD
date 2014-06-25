/**
 * Test to ensure that services can be created using app.register method.
 */
define(['app', 'decoServices', 'test/unit/factory/utestProvider' ], function (app, decoServices, unitestFactory) {
    console.log("* Running decoServices.spec.js");
    unitestFactory(decoServices);
});
