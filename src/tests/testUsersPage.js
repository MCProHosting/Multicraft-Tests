var lab   = require('../laboratory'),
    async = require('async');

module.exports = function (browser, next) {
    async.series([
        function (fn) {
            lab.assertPagegood(browser, 'users page', 'User List');
            lab.assert(browser.queryAll('#user-grid tbody tr').length == 1, 'User list does not display correctly');
            browser.clickLink('My Profile', fn);
        },
        function (fn) {
            lab.assertPagegood(browser, 'users "My Profile" page', 'View User');
            browser.fill('User[email]', 'foo@example.com').pressButton('Save', fn);
        },
        function (fn) {
            lab.assertPagegood(browser, 'users "My Profile" page post-save', 'View User');
            lab.assert(!! browser.html().indexOf('User saved'), '"My Profile" does not save user');
            browser.clickLink('Back', fn);
        },
        function (fn) {
            lab.assertPagegood(browser, 'user page after back link', 'User List');
            browser.clickLink('Create User', fn);
        },
        function (fn) {
            lab.assertPagegood(browser, '"create new user" page', 'Create User');
            browser
                .fill('User[name]', 'foouser')
                .fill('User[email]', 'foouser@example.com')
                .fill('User[password]', 'password123')
                .pressButton('Create', fn);
        },
        function (fn) {
            lab.assertPagegood(browser, 'post-creation page', 'View User');
            browser.clickLink('Back', fn);
        },
        function (fn) {
            lab.assertPagegood(browser, 'post-creation user list', 'User List');
            lab.assert(browser.queryAll('#user-grid tbody tr').length == 2, 'User list not updated after (supposed) user creation');
            browser.clickLink('Settings', fn);
        }
    ], next);
};