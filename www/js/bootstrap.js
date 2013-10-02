/**
 * bootstraps angular onto the window.document node
 */
define([
    'require',
    'app'
], function (require) {
    'use strict';
    angular.bootstrap(document, ['ngreq-app']);
});
