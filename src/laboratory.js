/**
 * Unit testing system
 * @module src/laboratory
 */

var colors            = require('colors'),
    wrap              = require('wordwrap')(50),
    passed_assertions = 0,
    tests             = [],
    message           = '',
    testing_string    = '',
    config            = require('./config_handler'),
    zombie            = require('zombie');

module.exports.assert = function (bool, fail_message) {
    if (bool !== true) {
        message = fail_message;
        testing_string += 'F';
    } else {
        passed_assertions++;
        testing_string += '.';
    }

    process.stdout.write('\n');
    process.stdout.write(testing_string);
};

module.exports.register = function (test) {
    tests.push(test);
};

var runtests = module.exports.runtests = function (callback) {
    var browser = new zombie();

    var runNextTest = function () {
        if (message.length) {
            console.log(message.red);
            callback(false);
        } else if (tests.length) {
            (tests.shift())(browser, runNextTest);
        } else {
            callback(true);
        }
    };
    browser.visit('http://' + config('php_serve_host') + ':' + config('php_serve_port'), runNextTest);
};

module.exports.summarize = function (callback) {
    runtests(function(success) {
        console.log('');
        console.log((success ? 0 : 1) + '/' + (passed_assertions) + ' Assertions Failed');
    
        if (success) {
            console.log('You\'re good to deploy!'.green);
        } else {
            console.log('Ya done derped!'.red);
        }

        callback();
    });
};