/**
 * Responsible for managing the PHP server for Multicraft.
 * @module src/server
 */

var cp          = require('child_process'),
    config      = require('./config_handler'),
    server_proc = null,
    state       = 'offline',
    net         = require('net');

// This useful function based on https://gist.github.com/timoxley/1689041
var isPortTaken = function(port, fn) {
    var tester = net.createServer()
        .once('error', function (err) {
            if (err.code != 'EADDRINUSE') return fn(err);
            fn(null, true);
        })
        .once('listening', function() {
            tester.once('close', function() {
                fn(null, false);
            }).close();
        }).listen(port, config('php_serve_host'));
};

module.exports = {};

module.exports.start = function (callback) {
    if (server_proc) {
        return callback();
    }

    server_proc = cp.spawn(
        config('php_command'),
        ['-S', config('php_serve_host') + ':' + config('php_serve_port')],
        {cwd: __dirname + '/../panel/'}
    );

    checker = setInterval(function () {
        isPortTaken(config('php_serve_port'), function (err, inuse) {
            if (inuse) {
                callback();
                state = 'online';
                clearInterval(checker);
            }
        });
    }, 2500);

    setTimeout(function () {
        if (state !== 'online') {
            callback('Timeout starting PHP server, please be sure that PHP is >= version 5.4.0 and works all peachy.');
        }
        clearInterval(checker);
    }, config('php_serve_timeout'));
};

module.exports.close = function () {
    if (server_proc) {
        server_proc.kill('SIGINT');
    }
};