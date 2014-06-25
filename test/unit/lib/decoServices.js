/**
 * Simulate the creation of provider using app.register.
 * `app.register` is expected to be decommissioned in the future release.
 */
define(['angularAMD', 'test/unit/factory/provider'], function(angularAMD, providerFactory) {
    var app = angularAMD.getCachedProvider("__orig_app");
    return providerFactory(app.register, "Deco");
});
