var lab    = require('../laboratory'),
    config = require('../config_handler');

module.exports = function (browser, next) {
    lab.assertPagegood(browser, 'homepage');
    browser.visit('http://' + config('php_serve_host') + ':' + config('php_serve_port') + '/index.php?r=site/logout', function () {
        lab.assertPagegood(browser, 'logout page');
        browser.clickLink('Login', next);
    });
};