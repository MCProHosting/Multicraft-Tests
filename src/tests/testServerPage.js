var lab    = require('../laboratory'),
    async  = require('async'),
    config = require('../config_handler');

module.exports = function (browser, next) {

    var goBackAndVisit = function (link, cb) {
        browser.clickLink('Back', function () {
            browser.clickLink(link, cb);
        });
    };

    async.series([
        function (fn) {
            lab.assertPagegood(browser, 'server list index', 'Server List');
            browser.clickLink('Create Server', fn);
        },
        function (fn) {
            lab.assertPagegood(browser, 'server creation page', 'Create Server');
            browser.pressButton('Create', fn);
        },
        function (fn) {
            lab.assertPagegood(browser, 'server post-create page', 'View Server');
            browser.clickLink('Chat', fn);
        },
        function (fn) {
            lab.assertPagegood(browser, 'server chat page', 'Chat');
            goBackAndVisit('Players', fn);
        },
        function (fn) {
            lab.assertPagegood(browser, 'server players page', 'Player List');
            browser.clickLink('Create Player', fn);
        },
        function (fn) {
            lab.assertPagegood(browser, 'server create player page', 'Create Player');
            browser.fill('Player[name]', 'connor4312').pressButton('Create', fn);
        },
        function (fn) {
            lab.assertPagegood(browser, 'server view player page post-create', 'View Player');
            browser.clickLink('Back', fn);
        },
        function (fn) {
            lab.assertPagegood(browser, 'server players page post-create', 'Player List');
            lab.assert(browser.queryAll('#player-grid tbody tr').length == 1, 'Player list does not display correctly');
            goBackAndVisit('Console', fn);
        },
        function (fn) {
            lab.assertPagegood(browser, 'server console', 'Console');
            goBackAndVisit('Config Files', fn);
        },
        function (fn) {
            lab.assertPagegood(browser, 'server config files', 'Config Files');
            goBackAndVisit('FTP File Access', fn);
        },
        function (fn) {
            lab.assertPagegood(browser, 'server ftp login page', 'Minecraft FTP Client Login');
            goBackAndVisit('Commands', fn);
        },
        function (fn) {
            lab.assertPagegood(browser, 'server command list page', 'Command List');
            browser.clickLink('Create Command', fn);
        },
        function (fn) {
            lab.assertPagegood(browser, 'server create command page', 'Create Command');
            browser.fill('Command[name]', 'somecommand').pressButton('Create', fn);
        },
        function (fn) {
            lab.assertPagegood(browser, 'server view command post-create', 'View Command');
            browser.clickLink('Back', fn);
        },
        function (fn) {
            lab.assertPagegood(browser, 'server command list page post-create', 'Command List');
            lab.assert(!! browser.html().indexOf('somecommand'), 'Command is not listed after its creation');
            goBackAndVisit('Scheduled Tasks', fn);
        },
        function (fn) {
            lab.assertPagegood(browser, 'server task page', 'Scheduled Tasks');
            browser.clickLink('New Task', fn);
        },
        function (fn) {
            lab.assertPagegood(browser, 'server create task page', 'View Task'); // Should be "Create Task" - probably an minor oversight
            browser.fill('Schedule[name]', 'sometask').pressButton('Create', fn);
        },
        function (fn) {
            lab.assertPagegood(browser, 'server task page post-create', 'View Task');
            browser.clickLink('Back', fn);
        },
        function (fn) {
            lab.assertPagegood(browser, 'server task page post-create', 'Scheduled Tasks');
            lab.assert(!! browser.html().indexOf('sometask'), 'Task is not listed after its creation');
            // Forced to specify URL directly, as "Users" appears first in topbar
            // https://github.com/assaf/zombie/issues/603 addresses a means for a fix, but doesn't look like
            //  that's going to get resolved any time soon...
            browser.visit('http://' + config('php_serve_host') + ':' + config('php_serve_port') + '/index.php?r=server/users&id=2', fn);
        },
        function (fn) {
            lab.assertPagegood(browser, 'server users page', 'Users');
            goBackAndVisit('Delete Server', fn);
        },
        function (fn) {
            lab.assertPagegood(browser, 'server delete page', 'Delete Server');
            browser.pressButton('Delete', fn);
        }
    ], next);
};