/**
 * Responsible for providing configuration to other modules.
 * @module src/setup
 */

var optimist = require('optimist'),
    config   = require('../config.json');

module.exports = function (item) {
    if (typeof optimist.argv[item] != 'undefined') {
        return optimist.argv[item];
    }

    return config[item];
};