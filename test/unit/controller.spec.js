/**
 * Testing declaration of controller following require.js spec and make sure
 * it's dependecies are loaded.
 */
define(['app', 'controller', 'angularAMD'], function (app, controller, angularAMD) {
    console.log("* Running controller.spec.js");
    describe('Utest Controller', function () {
        //console.log("Running controllerSpec.js");
        var ctrl_name = controller.ctrl_name,
            service_results = controller.result,
            scope, ctrl;

        angularAMD.inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();
            ctrl = $controller(ctrl_name, { $scope: scope });
        });
        
        it("service_results should exists.", function () {
            expect(service_results).toBeDefined();
        });
        
        it("scope.ctrl_name check", function () {
            expect(scope.ctrl_name).toBe(ctrl_name);
        });
        
        it("scope.utest_factory check", function () {
            var f = scope.utest_factory;
            expect(f.name).toBe(service_results.factory_name);
            expect(f.const_name).toBe(service_results.constant_name);
        });
        
        it("scope.utest_service check", function () {
            var s = scope.utest_service;
            expect(s.name).toBe(service_results.service_name);
            expect(s.val_name).toBe(service_results.value_name);
        });
        
        it("scope.subModule check", function () {
            // console.log("scope.subModule check", service_results.sub_module);
            expect(scope.utest_sub_module.get()).toBe(service_results.sub_module);
        });

    });
});
