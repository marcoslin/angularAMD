/*jslint devel: true, node: true */
/*globals describe */

define(['angularAMD'], function (angularAMD) {
    // Create and bootstrap, replicating what normally takes place in app.js
    var app_name = "unitest-app",
        app = angular.module(app_name, []),
        ngAMD = angularAMD(app),
        altAngular = ngAMD.getAlternateAngular(),
        origAngular = angular;
    
    // Bootstrap Angular
    angular.bootstrap(document, [app_name]);
    window.angular = altAngular;

    describe('angularAMD Unit Tests', function () {
        'use strict';
        describe('ngAMD', function () {
            // Load angularAMD
            it('making sure app is defined.', function () {
                expect(app.name).toBe(app_name);
            });
            it('app.ngAMD is created.', function () {
                expect(app.ngAMD).toBe(ngAMD);
            });
            it('ngAMD.getAlternateAngular works.', function () {
                expect(altAngular).toBeDefined();
                expect(window.angular).toBe(altAngular);
                expect(window.angular).not.toBe(origAngular);
            });
            
            describe('cached property', function () {
                var cached_provider = ngAMD.__read_protected("app_cached_providers"),
                    cached_angular = ngAMD.__read_protected("orig_angular");
                
                it('controllerProvider', function () {
                    expect(cached_provider.$controllerProvider).toBeDefined();
                });
                it('directive', function () {
                    expect(cached_provider.$directive).toBeDefined();
                });
                it('filter', function () {
                    expect(cached_provider.$filter).toBeDefined();
                });
                it('animateProvider', function () {
                    expect(cached_provider.$animateProvider).toBeDefined();
                });
                it('provide', function () {
                    expect(cached_provider.$provide).toBeDefined();
                });
                it('injector', function () {
                    expect(cached_provider.$injector).toBeDefined();
                });
                it('orig_angular', function () {
                    expect(cached_angular).toBe(origAngular);
                });
            
            });

        });
        

        
        
        
        
    
    });

});


/*
describe('angularAMD: Unit Tests', function () {
    'use strict';
    var ngAMD = 3;
    // Load angularAMD
    it('test01', function () {
        console.log(ngAMD);
        expect(ngAMD).toBe(3);
    });    

});
*/