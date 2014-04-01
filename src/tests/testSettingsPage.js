var lab   = require('../laboratory'),
    async = require('async');

/* Can't do a ton here without a whole other setup for testing daemons, but
we'll go though and make sure pages display alright */

module.exports = function (browser, next) {

    var goBackAndVisit = function (link, cb) {
        browser.clickLink('Settings', function () {
            browser.clickLink(link, cb);
        });
    };

    async.series([
        function (fn) {
            lab.assertPagegood(browser, 'settings index', 'Minecraft Manager Settings');
            browser.pressButton('Save', fn);
        },
        // For some reason, the AJAX on status and update pages causes Zombie to crash. Can't test them right now...
        function (fn) {
            lab.assertPagegood(browser, 'settings index', 'Minecraft Manager Settings');
            goBackAndVisit('Panel Configuration', fn);
        },
        function (fn) {
            lab.assertPagegood(browser, 'panel configuration', 'Panel Configuration');
            goBackAndVisit('Statistics', fn);
        },
        function (fn) {
            lab.assertPagegood(browser, 'statistics', 'Multicraft Statistics');
            goBackAndVisit('Operations', fn);
        },
        function (fn) {
            lab.assertPagegood(browser, 'operations', 'Multicraft Operations');
            goBackAndVisit('Config File Settings', fn);
        },
        function (fn) {
            lab.assertPagegood(browser, 'panel config files settings', 'Config File Settings');
            browser.clickLink('Servers', fn);
        }
    ], next);
};