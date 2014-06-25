/**
 * Test focusing on setup of ngAMD making sure that cached provider are defined.
 */
define(['app','angularAMD', 'test/unit/factory/utestProvider'], function (app, angularAMD, utestProvider) {
    console.log("* Running app.spec.js");

    describe('angularAMD', function () {

        describe("basics", function () {
            it('should be defined.', function () {
                expect(angularAMD).toBeDefined();
            });
            it('app should be defined.', function () {
                expect(app.name).toBe(angularAMD.appname());
            });
            it('app.__origAngular should be defined.', function () {
                var orig_angular = angularAMD.getCachedProvider('__orig_angular');
                expect(app.__origAngular).toBeDefined();
                expect(app.__origAngular).toBe(orig_angular);
            });
            it('app.__preServiceResult should be defined.', function () {
                expect(app.__preServiceResult).toBeDefined();
            });
            it('alternate angular should be defined.', function () {
                var alt_angular = angularAMD.getCachedProvider('__alt_angular');
                expect(alt_angular).toBeDefined();
                expect(window.angular).toBe(alt_angular);
            });
        });
        
        describe('cached property', function () {
            it('controllerProvider', function () {
                expect(angularAMD.getCachedProvider("$controllerProvider")).toBeDefined();
            });
            it('compileProvider', function () {
                expect(angularAMD.getCachedProvider("$compileProvider")).toBeDefined();
            });
            it('filterProvider', function () {
                expect(angularAMD.getCachedProvider("$filterProvider")).toBeDefined();
            });
            it('animateProvider', function () {
                expect(angularAMD.getCachedProvider("$animateProvider")).toBeDefined();
            });
            it('provide', function () {
                expect(angularAMD.getCachedProvider("$provide")).toBeDefined();
            });
            it('injector', function () {
                expect(angularAMD.getCachedProvider("$injector")).toBeDefined();
            });
            it('orig_angular', function () {
                // Access the 'hidden' provider created for unit test purpose
                expect(angularAMD.getCachedProvider("__orig_angular")).toBe(app.__origAngular);
            });
        });
        
        describe('.router', function () {
            
            it('should be simple pass-through', function () {
                var utestConfig = { one: "m45awKLtbM", two: "IZh0o0almb", make: "FB7T7WefnD" };
                expect(angularAMD.route(utestConfig)).toBe(utestConfig);
            });
            
            describe('with controllerURL param:', function () {
                var tabName = "6oO33kWCB2", r;
                beforeEach(function () {
                    r = angularAMD.route({ controllerUrl: 'test/unit/lib/controller', navtab: tabName });
                });
    
                it('navtab should be defined.', function () {
                    expect(r.navtab).toBe(tabName);
                });
    
                it('controllerUrl should have been deleted.', function () {
                    expect(r.controllerUrl).toBeUndefined();
                });
                
                it('resolve should have been populated.', function () {
                    expect(r.resolve["__AAMDCtrl"]).toBeDefined(); //jshint ignore:line
                });
            });
            
            describe('with controller param: ', function () {
                var tabName = "ioOc7ZIofT", r;
                beforeEach(function () {
                    r = angularAMD.route({ controller: 'controller' });
                });
    
                it('controller should be defined.', function () {
                    expect(r.controller).toBeDefined();
                });
    
                it('resolve should have been populated.', function () {
                    expect(r.resolve["__AAMDCtrl"]).toBeDefined(); //jshint ignore:line
                });
            });
        });

        // Perform test to ensure preService loaded before bootstrap works.
        utestProvider(app.__preServiceResult);

    });

});
