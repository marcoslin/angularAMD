/*jslint browser: true, devel: true, node: true, nomen: true */
/*globals define, angular, describe, expect, it */

/**
 * Test focusing on setup of ngAMD making sure that cached provider are defined.
 */
define(['app'], function (app) {
    'use strict';
    describe('angularAMD.ngAMD', function () {
        //console.log("Running appSpec.js");
        
        it('app.ngAMD is created.', function () {
            expect(app.ngAMD).toBeDefined();
        });
        it('app is defined.', function () {
            expect(app.name).toBe(app.ngAMD.appname());
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
            it('compileProvider', function () {
                expect(app.ngAMD.getCachedProvider("$compileProvider")).toBeDefined();
            });
            it('filterProvider', function () {
                expect(app.ngAMD.getCachedProvider("$filterProvider")).toBeDefined();
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
        
        describe('.router', function () {
            
            it('should be simple pass-through', function () {
                var utestConfig = { one: "m45awKLtbM", two: "IZh0o0almb", make: "FB7T7WefnD" };
                expect(app.ngAMD.route(utestConfig)).toBe(utestConfig);
            });
            
            describe('with controllerURL param:', function () {
                var tabName = "6oO33kWCB2", r;
                beforeEach(function () {
                    r = app.ngAMD.route({ controllerUrl: 'test/unit/lib/controller', navtab: tabName });
                });
    
                it('navtab should be defined.', function () {
                    expect(r.navtab).toBe(tabName);
                });
    
                it('controllerUrl should have been deleted.', function () {
                    expect(r.controllerUrl).toBeUndefined();
                });
                
                it('resolve should have been populated.', function () {
                    expect(r.resolve["__load"]).toBeDefined();
                });             
            });
            
            
            describe('with controller param: ', function () {
                var tabName = "ioOc7ZIofT", r;
                beforeEach(function () {
                    r = app.ngAMD.route({ controller: 'controller' });
                });
    
                it('controller should be defined.', function () {
                    expect(r.controller).toBeDefined();
                });
    
                it('resolve should have been populated.', function () {
                    expect(r.resolve["__load"]).toBeDefined();
                });             
            });
        });
        
    });

});
