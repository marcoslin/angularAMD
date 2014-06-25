/**
 * Simulate the creation of provider using app.
 */
define(['app', 'test/unit/factory/provider'], function(app, providerFactory) {
    return providerFactory(app, "Reg");
});
