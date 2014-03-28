/**
 * Responsible for setting up the panel state prior to the start of testing.
 * @module src/setup
 */

var ejs    = require('ejs'),
    async  = require('async'),
    fs     = require('fs-extra'),
    config = require('./config_handler');

var copyConfig = function (callback) {
    var template = fs.readFileSync(__dirname + '/assets/config.php.ejs', {encoding: 'utf-8'}),
        content  = ejs.render(template, config('template'));

    fs.writeFile(__dirname + '/../panel/protected/config/config.php', content, callback);
};

var copyDaemonDB = function (callback) {
    fs.copy(
        __dirname + '/assets/data-daemon.db',
        __dirname + '/../panel/protected/data/data-daemon.db',
        callback
    );
};

var copyPanelDB = function (callback) {
    fs.copy(
        __dirname + '/assets/data-panel.db',
        __dirname + '/../panel/protected/data/data-panel.db',
        callback
    );
};

module.exports = function (callback) {
    async.parallel([copyConfig, copyDaemonDB, copyPanelDB], callback);
};