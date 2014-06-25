/**
 * Testing declaration of controller following require.js spec and make sure
 * it's dependecies are loaded.
 */
define(['app', 'angularAMD', 'regController'], function (app, angularAMD, regController) {
    console.log("* Running regController.spec.js");
    describe('Utest RegController', function () {
        //console.log("Running controllerSpec.js");
        var ctrl_name = regController.ctrl_name,
            result = regController.result,
            scope, ctrl;

        angularAMD.inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();
            ctrl = $controller(ctrl_name, { $scope: scope });
        });
        
        it("utestResult should exists.", function () {
            expect(result).toBeDefined();
        });
        
        it("scope.ctrl_name check", function () {
            expect(scope.ctrl_name).toBe(ctrl_name);
        });
        
        it("scope.utest_factory check", function () {
            var f = scope.utest_factory;
            expect(f.name).toBe(result.factory_name);
            expect(f.const_name).toBe(result.constant_name);
        });
        
        it("scope.utest_service check", function () {
            var s = scope.utest_service;
            expect(s.name).toBe(result.service_name);
            expect(s.val_name).toBe(result.value_name);
        });

    });
});
