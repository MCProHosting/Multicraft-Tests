/**
 * Unit testing system
 * @module src/laboratory
 */

var colors            = require('colors'),
    wrap              = require('wordwrap')(50),
    passed_assertions = 0,
    failed_assertions = 0,
    tests             = [],
    message           = '',
    testing_string    = '',
    config            = require('./config_handler'),
    zombie            = require('zombie');

var assert = module.exports.assert = function (bool, fail_message) {
    if (bool !== true) {
        failed_assertions++;
        message = fail_message;
        process.stdout.write('F');
    } else {
        passed_assertions++;
        process.stdout.write('.');
    }
};

module.exports.assertPagegood = function (browser, page, title) {
    assert(browser.success, page + 'failed to load.');
    assert(browser.errors.length === 0, 'Browser error(s) in ' + page);
    assert(!! browser.query('body'), 'Body didn\'t appear on ' + page);

    if (title) {
        assert(browser.text('title') == 'Multicraft - ' + title, 'Title incorrect on ' + page);
    }
};

module.exports.register = function (test) {
    tests.push(test);
};

var runtests = module.exports.runtests = function (callback) {
    var browser = new zombie();

    var runNextTest = function () {
        if (message.length) {
            console.log('');
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
        console.log(failed_assertions + '/' + (passed_assertions + failed_assertions) + ' Assertions Failed');
    
        if (success) {
            console.log('You\'re good to deploy!'.green);
        } else {
            console.log('Ya done derped!'.red);
        }

        callback();
    });
};