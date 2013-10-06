/*jslint browser: true, devel: true, node: true, nomen: true */
/*globals define, angular, describe, expect, it */

/**
 * Test focusing on setup of ngAMD making sure that cached provider are defined.
 */
define(['app'], function (app) {
    'use strict';
    describe('angularAMD.ngAMD', function () {
        //console.log("Running appSpec.js");
        
        it('app is defined.', function () {
            expect(app.name).toBe(app.__appname);
        });
        it('app.ngAMD is created.', function () {
            expect(app.ngAMD).toBe(app.ngAMD);
        });
        it('app.__origAngular is defined.', function () {
            expect(app.__origAngular).toBeDefined();
        });
        it('.getAlternateAngular works.', function () {
            expect(window.angular).not.toBe(app.__origAngular);
        });
        
        describe('cached property', function () {
            it('controllerProvider', function () {
                expect(app.ngAMD.getCachedProvider("$controllerProvider")).toBeDefined();
            });
            it('directive', function () {
                expect(app.ngAMD.getCachedProvider("$directive")).toBeDefined();
            });
            it('filter', function () {
                expect(app.ngAMD.getCachedProvider("$filter")).toBeDefined();
            });
            it('animateProvider', function () {
                expect(app.ngAMD.getCachedProvider("$animateProvider")).toBeDefined();
            });
            it('provide', function () {
                expect(app.ngAMD.getCachedProvider("$provide")).toBeDefined();
            });
            it('injector', function () {
                expect(app.ngAMD.getCachedProvider("$injector")).toBeDefined();
            });
            it('orig_angular', function () {
                // Access the 'hidden' provider created for unit test purpose
                expect(app.ngAMD.getCachedProvider("__orig_angular")).toBe(app.__origAngular);
            });
        });
    });

});
