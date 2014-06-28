/*jslint browser: true, devel: true, node: true, nomen: true */
/*globals define, angular, describe, expect, it */

/**
 * Test focusing on making sure that window.angular has not been modified and
 * that .processQueue raises error when enable_ngload is set to false in
 * .bootstrap
 */
define(['app_no_ngload','angularAMD'], function (app, angularAMD) {
    'use strict';
    describe('angularAMD_no_ngload', function () {
        //console.log("Running app_no_ngload.spec.js");

        it('is created.', function () {
            expect(angularAMD).toBeDefined();
        });
        it('app is defined.', function () {
            expect(app.name).toBe(angularAMD.appname());
        });
        it('original angular should defined.', function () {
            var orig_angular = angularAMD.getCachedProvider('__orig_angular');
            expect(orig_angular).toBeDefined();
            expect(window.angular).toBe(orig_angular);
        });
        it('alternate angular should not be set.', function () {    
            expect(angularAMD.getCachedProvider('__alt_angular')).toBeUndefined();
        });
        
        it('.processQueue should throw an error.', function () {
            expect(angularAMD.processQueue).toThrow();
        });

    });
    describe('angularAMD Module', function() {
        var $compile, $rootScope;
        beforeEach(function() {
            angular.injector(['ng', 'amd']).invoke(['$compile', '$rootScope', function(_$compile, _$rootScope) {
                $compile = _$compile;
                $rootScope = _$rootScope;
            }])
        });

        it('Tests should load $compile', function() {
            expect($compile).toBeDefined();
            expect($rootScope).toBeDefined();
        });

        it('angular is present', function() {
            expect(angular).toBeDefined();
            expect(angular.module).toBeDefined();
        });
        it('registers as an Angular module.', function() {
          //  expect(angular.module('amd')).toBeDefined();
        });

        it('basic angular test', function() {
            var element = $compile('<span ng-bind="1+2"></span>')($rootScope);
            $rootScope.$digest();
            expect(element.html()).toEqual('3');
        });

        it('basic async test', function() {
            var foo = 0;
            runs(function() {
                setTimeout(function() {
                    foo++;
                }, 10);
            });
            waits(20);

            runs(function() {
                expect(foo).toEqual(1);
            })
        });

        describe('requireDirective', function() {
            define('test/testModule', [], {});
            define('test/dir/testModule1', [], {});

            it('compiles as an attribute', function() {
                var element = $compile('<span amd-require="test/testModule">Content {{1+2}}</span>')($rootScope);

                $rootScope.$digest();
                expect(element.html()).not.toContain('Content');

                waits(100);

                runs(function() {
                    $rootScope.$digest();
                    expect(element.html()).toContain('3');
                })

            });

            it('can resolve dependencies relative to amd-base-url', function() {
                var element = $compile('<span amd-base-url="test" amd-require="./testModule">Content {{1+2}}</span>')($rootScope);

                $rootScope.$digest();
                expect(element.html()).not.toContain('Content');

                waits(100);

                runs(function() {
                    $rootScope.$digest();
                    expect(element.html()).toContain('3');
                })

            });

            it('can traverse up tree from amd-base-url', function() {
                var element = $compile('<span amd-base-url="test/dir" amd-require="./testModule1 ../testModule">Content {{1+2}}</span>')($rootScope);

                $rootScope.$digest();
                expect(element.html()).not.toContain('Content');

                waits(100);

                runs(function() {
                    $rootScope.$digest();
                    expect(element.html()).toContain('3');
                })
            });
        });
    });
});