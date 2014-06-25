/**
 * Test focusing on making sure that window.angular has not been modified and
 * that .processQueue raises error when enable_ngload is set to false in
 * .bootstrap
 */
define(['app_no_ngload','angularAMD'], function (app, angularAMD) {
    console.log("* Running app_no_ngload.spec.js");
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
});
        