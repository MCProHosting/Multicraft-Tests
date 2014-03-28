var lab = require('../laboratory');

module.exports = function (browser, next) {
    lab.assertPagegood(browser, 'login page');

    browser
        .fill('LoginForm[name]', 'admin')
        .fill('LoginForm[password]', 'badpassword')
        .pressButton('Login', function() {
            lab.assertPagegood(browser, 'login post-submit', 'Login');
            lab.assert(!! browser.text('title').indexOf('Incorrect username or password'), 'Login does not show error message');

            browser
                .fill('LoginForm[name]', 'admin')
                .fill('LoginForm[password]', 'admin')
                .pressButton('Login', function() {
                    lab.assertPagegood(browser, 'login post-submit', 'Server List');
                    browser.clickLink('Users', next);
                });
        });
};