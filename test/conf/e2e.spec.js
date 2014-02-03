var url = require("url");

describe('angularAMD', function() {
    var ptor = protractor.getInstance();
    
    /**
     * Function used to in place of `ptor.get` as the native version will not wait for manual bootstrapping.
     * The solution is to wait for wait for URL to be loaded
     */
    function ptor_get(rel_path) {
        ptor.driver.get(url.resolve(ptor.baseUrl, rel_path));
        ptor.wait(function () {
            waits(500);
            return ptor.driver.getCurrentUrl().then(function(in_url) {
                var re = new RegExp(rel_path, "i");
                return re.test(in_url);
            });
        }, 5000, "Taking too long to load " + rel_path);
    }
    
    describe("home", function () {
        beforeEach(function () {
            ptor_get('#/home');
        });
        
        it('should redirect to home', function() {
            expect(ptor.getCurrentUrl()).toContain('#/home');
        });
        
        it("View on GitHub button should exists", function () {
            expect($("#view-on-github").getAttribute('class')).toBe("btn btn-large");
        });
        
        it("View on GitHub button should exists", function () {
            expect($("#view-on-github").getAttribute('class')).toBe("btn btn-large");
            expect($("#view-on-github i").getAttribute('class')).toBe("icon-github-sign");
        });
    });

    describe("module", function () {
        beforeEach(function () {
            ptor_get('#/modules');
        });
        
        it("ng-write to output correct value", function () {
            expect($("#output-ng-write").getText()).toBe("Output from Directive");
            expect($("#output-deferred-string").getText()).toBe("Show case ngWrite with promise");
            expect($("#output-deferred-object").getText()).toBe("This is defered response");
            expect($("#output-run").getText()).toBe("Greetings from .run");
            expect($("#output-config").getText()).toBe("And config works");
        });
        
    });
    
});
