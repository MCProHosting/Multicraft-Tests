var lab = require('../laboratory');

var test = function (browser, next) {
    lab.assert(browser.success, 'Homepage failed to load.');
    browser.clickLink('Login', next);
};

module.exports = function () {
    lab.register(test);
};