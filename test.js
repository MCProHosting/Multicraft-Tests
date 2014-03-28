var setup  = require('./src/setup.js'),
    server = require('./src/server.js'),
    lab    = require('./src/laboratory.js'),
    async  = require('async'),
    colors = require('colors');

console.log('');

async.series([
    setup,
    server.start
], function (err) {
    if (err) {
        console.log(err.red);
    } else {
        lab.summarize();
    }
    server.close();
});