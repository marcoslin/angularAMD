var url = require("url");

describe('angularAMD', function() {
    var ptor = protractor.getInstance(),
        default_wait_ms = 15000;
    
    /**
     * Function used to in place of `ptor.get` as the native version will not wait for manual bootstrapping.
     * It adds an 0.5 sec wait before checking that url has been correctly set.
     */
    function ptor_get(rel_path) {
        ptor.driver.get(url.resolve(ptor.baseUrl, rel_path));
        ptor.wait(function () {
            return ptor.driver.getCurrentUrl().then(function(in_url) {
                var re = new RegExp(rel_path, "i");
                return re.test(in_url);
            });
        }, default_wait_ms, "Taking too long to load " + rel_path);
        ptor.sleep(1000);
    }
    
    function ptor_waitForElementById(nameId) {
        ptor.wait(function () {
            //console.log("Checking if " + nameId + " exists");
            return ptor.driver.isElementPresent(by.id(nameId)).then(function (is_present) {
                return is_present;
            });
        }, default_wait_ms, "Taking too long waiting for element id '" + nameId + "' to be present.");
        return element(by.id(nameId));
    }
    
    describe("home", function () {
        it('tab should be active', function() {
            ptor_get('#/home');
            var navElem = ptor_waitForElementById("nav-home");
            expect(navElem.getAttribute("class")).toBe("active");
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

    describe("map", function () {
        // As map tab takes a bit longer to become active, probably due to the work to load google map
        it("tab should be active", function () {
            ptor_get('#/map');
            var navElem = ptor_waitForElementById("nav-map");
            ptor.wait(function () {
                return navElem.getAttribute("class").then(function (class_value) {
                    return class_value == "active";
                });
            }, default_wait_ms, "Taking too long for map tab to become active");
        });
        
        // As map takes a bit to load, give it up to 5 secs for it to load
        it("should be loaded", function () {
            ptor_waitForElementById("map-canvas");
            expect($('#map-canvas .gm-style').getAttribute("style")).toBeDefined();
        });
    })
    
    describe("module", function () {
        it("modules tab should be active", function () {
            ptor_get('#/modules');
            var navElem = ptor_waitForElementById("nav-modules");
            ptor.wait(function () {
                return navElem.getAttribute("class").then(function (class_value) {
                    return class_value == "active";
                });
            }, default_wait_ms, "Taking too long for map tab to become active");        
        });
        
        it("ng-write to output correct value", function () {
            expect($("#output-ng-write").getText()).toBe("Output from Directive");
        });

        it("DeferredString to output correct value", function () {
            expect($("#output-deferred-string").getText()).toBe("Show case ngWrite with promise");
        });
        
        it("DeferredObject to output correct value", function () {
            expect($("#output-deferred-object").getText()).toBe("This is defered response");
        });
        
        it(".run to output correct value", function () {
            expect($("#output-run").getText()).toBe("Greetings from .run");
        });
        
        it(".config to output correct value", function () {
            expect($("#output-config").getText()).toBe("And config works");
        });
        
        
    });

    // This has to be the last as ignoreSynchronization seems to impact remaining tests
    describe("pictures", function () {
        it("tab should be active", function () {
            ptor_get('#/pictures');
            var navElem = ptor_waitForElementById("nav-pictures");
            ptor.wait(function () {
                return navElem.getAttribute("class").then(function (class_value) {
                    return class_value == "active";
                });
            }, default_wait_ms, "Taking too long for pictures tab to become active");   
        });

        // Ignoring sync due to use of $timer in ui-bootstrap to change pictures
        describe("ignore sync", function () {
            beforeEach(function () {
                ptor.ignoreSynchronization = true;
            });
            afterEach(function () {
                ptor.ignoreSynchronization = false;
            });
            
            it("london clicked", function () {
                var btn_london = $('#btn-london'),
                    pictures = element.all(by.repeater('row in rows')),
                    pictures_count = 0;
                
                btn_london.click().then(function () {
                    expect(btn_london.getAttribute("class")).toMatch('active');
                    
                    // Get the pictures_count using repeater
                    ptor.wait(function () {
                        return pictures.count().then( function (row_count) {
                            if (row_count > 0) {
                                pictures_count = row_count;
                                return true;
                            } else {
                                return false;
                            }
                        });
                    }, default_wait_ms, "Taking too long to load pictures");
                    
                    // Make sure that number of `slide_image` is the same as pictures_count
                    var slideimages = element.all(by.css('.slide-image'));
                    slideimages.count().then(function (row_count) {
                        expect(row_count).toBe(pictures_count);
                    })
                });
            });
            
            it("rome clicked", function () {
                var btn_rome = $('#btn-rome');                
                btn_rome.click().then(function () {
                    expect(btn_rome.getAttribute("class")).toMatch('active');
                });
            });
            
        });
    })
    
});
