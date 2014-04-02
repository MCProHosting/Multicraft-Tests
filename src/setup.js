/**
 * Responsible for setting up the panel state prior to the start of testing.
 * @module src/setup
 */

var ejs     = require('ejs'),
    async   = require('async'),
    fs      = require('fs-extra'),
    cp      = require('child_process'),
    d_base  = __dirname + '/../',
    d_panel = d_base + 'panel/',
    config  = require('./config_handler');

var copyConfig = function (callback) {
    var template = fs.readFileSync(d_base  + 'src/assets/config.php.ejs', {encoding: 'utf-8'}),
        content  = ejs.render(template, config('template'));

    fs.writeFile(d_panel + 'protected/config/config.php', content, callback);
};

var copyDaemonDB = function (callback) {
    fs.copy(
        d_base  + 'src/assets/data-daemon.db',
        d_panel + 'protected/data/data-daemon.db',
        callback
    );
};

var copyPanelDB = function (callback) {
    fs.copy(
        __dirname + '/assets/data-panel.db',
        d_panel + 'protected/data/data-panel.db',
        callback
    );
};

var runShScript = function (callback) {
    var f = d_base + 'setup/setup.sh';
    if (!fs.existsSync(f)) {
        return callback();
    }

    cp.spawn('sh', [f], {cwd: d_panel}).on('close', callback);
};

var runBatScript = function (callback) {
    var f = d_base + 'setup/setup.bat';
    if (!fs.existsSync(f)) {
        return callback();
    }

    cp.spawn('c:/windows/system32/cmd.exe', ['/c', f], {cwd: d_panel}).on('close', callback);
};

var runJsScript = function (callback) {
    var f = d_base + 'setup/setup.js';
    if (!fs.existsSync(f)) {
        return callback();
    }

    require(f)(d_panel, callback);
};

var runCustomScripts = function (callback) {
    async.parallel([runShScript, runBatScript, runJsScript], callback);
};

module.exports = function (callback) {
    async.parallel([copyConfig, copyDaemonDB, copyPanelDB, runCustomScripts], callback);
};