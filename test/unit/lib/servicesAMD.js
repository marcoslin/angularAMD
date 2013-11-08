/*jslint nomen: true */
/*globals define, angular */

/**
 * This module is a proxy to the independent angular.module that has not been created
 * for require.js.  This proxy is necessary as logic in angular's module allow for out
 * of order creation of services.
 *
 * As the dependencies in 'define' does not guarantee loading sequence, the non-requirejs
 * module must have it's dependency declared in shim.  The 'app' is cleared here as 'app'
 * variable is needed.
 */
define(['angularAMD', 'services'], function (angularAMD) {
    'use strict';
    angularAMD.processQueue();
    return angularAMD;
});