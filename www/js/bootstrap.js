/**
 * bootstraps angular onto the window.document node
 */
define([
    'require',
    'angular',
    'app'
], function (require, ng) {
    'use strict';
    console.log("ng: ", ng);
    require(['domReady!'], function (document) {
        ng.bootstrap(document, ['app']);
    });
});
