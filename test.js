var setup  = require('./src/setup.js'),
    server = require('./src/server.js'),
    lab    = require('./src/laboratory.js'),
    async  = require('async'),
    colors = require('colors'),
    fs     = require('fs');

console.log('');

async.series([
    setup,
    server.start
], function (err) {

    lab.register(require('./src/tests/testHomePage'));
    lab.register(require('./src/tests/testLoginPage'));
    lab.register(require('./src/tests/testUsersPage'));

    if (err) {
        console.log(err.red);
        server.close();
    } else {
        lab.summarize(server.close);
    }
});