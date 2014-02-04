var url = require("url");

describe('angularAMD', function() {
    var ptor = protractor.getInstance();
    
    /**
     * Function used to in place of `ptor.get` as the native version will not wait for manual bootstrapping.
     * It adds an 0.5 sec wait before checking that url has been correctly set.
     */
    function ptor_get(rel_path) {
        ptor.driver.get(url.resolve(ptor.baseUrl, rel_path));
        ptor.wait(function () {
            //waits(500);
            return ptor.driver.getCurrentUrl().then(function(in_url) {
                var re = new RegExp(rel_path, "i");
                return re.test(in_url);
            });
        }, 2000, "Taking too long to load " + rel_path);
    }
    
    describe("home", function () {
        beforeEach(function () {
            ptor_get('#/home');
        });
        
        it('tab should be active', function() {
            expect(ptor.getCurrentUrl()).toContain('#/home');
            ptor.wait(function () {
                return $('#nav-home').getAttribute("class").then(function (class_value) {
                    return class_value == "active";
                });
            }, 1000, "Taking too long for pictures tab to become active")            
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
        
        /* As modules tab takes few seconds to load, moving the tab active test to the output test
        it("modules tab should be active", function () {
            expect($('#nav-modules').getAttribute("class")).toBe("active");
        });
        */
        
        it("ng-write to output correct value", function () {
            expect($('#nav-modules').getAttribute("class")).toBe("active");
            expect($("#output-ng-write").getText()).toBe("Output from Directive");
            expect($("#output-deferred-string").getText()).toBe("Show case ngWrite with promise");
            expect($("#output-deferred-object").getText()).toBe("This is defered response");
            expect($("#output-run").getText()).toBe("Greetings from .run");
            expect($("#output-config").getText()).toBe("And config works");
        });
        
    });
    
    describe("pictures", function () {
        beforeEach(function () {
            ptor_get('#/pictures');
        });
        
        it("tab should be active", function () {            
            ptor.wait(function () {
                return $('#nav-pictures').getAttribute("class").then(function (class_value) {
                    return class_value == "active";
                });
            }, 1000, "Taking too long for pictures tab to become active")
        });
    })
    
    describe("map", function () {
        beforeEach(function () {
            ptor_get('#/map');
        });
        
        it("tab should be active", function () {            
            ptor.wait(function () {
                return $('#nav-map').getAttribute("class").then(function (class_value) {
                    return class_value == "active";
                });
            }, 1000, "Taking too long for map tab to become active")
        });
        
        it("map should be loaded", function () {

            expect($('#map-canvas .gm-style').getAttribute("style")).toBeDefined();
        });
        
    })
    
});
