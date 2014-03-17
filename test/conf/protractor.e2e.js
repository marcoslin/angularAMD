// An example configuration file.
exports.config = {
    // Remove definition for `seleniumAddress` so that selenium is launched by protractor.
    // seleniumAddress: 'http://localhost:4444/wd/hub',
    
    //Capabilities to be passed to the webdriver instance.
    capabilities: {
        'browserName': 'phantomjs',
        'phantomjs.binary.path': './node_modules/karma-phantomjs-launcher/node_modules/phantomjs/bin/phantomjs'
    },
    
    //baseUrl: 'http://localhost:8444',
    
    // Spec patterns are relative to the current working directly when
    // protractor is called.
    specs: ['../e2e/*.spec.js'],
    
    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000
    }
};
