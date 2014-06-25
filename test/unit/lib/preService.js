/**
 * Simulate the creation of provider using angularAMD.  Used before bootstrap
 */
define(['angularAMD', 'test/unit/factory/provider'], function(angularAMD, providerFactory) {
    return providerFactory(angularAMD, "Pre");
});
