/**
 * Testing declaration of controller following require.js spec and make sure
 * it's dependecies are loaded.
 */
define(['angularAMD'], function (angularAMD) {
    console.log("* Running controllerFn.spec.js");
    describe('Utest Controller', function () {
        //console.log("Running controllerSpec.js");
        var route, location, rootScope;

        angularAMD.inject(function ($route, $location, $rootScope) {
            route = $route;
            location = $location;
            rootScope = $rootScope;
        });

        it("route should be undefined.", function () {
            expect(route.current).toBeUndefined();
        });

        it("controller should load for /controllerFn route.", function () {
            location.path('/controllerFn');
            rootScope.$digest();

            // Make sure that route has changed
            expect(route.current.utestParam).toBe('controllerFn');

            // Controller should be defined
            expect(route.current.controller).toBeDefined();

            // Make sure that controller has been set to custom function
            expect(route.current.controller.toString()).toMatch(/^\$scope,__AAMDCtrl,\$injector,function/);
        });

    });
});
