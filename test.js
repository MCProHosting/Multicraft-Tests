var setup  = require('./src/setup.js'),
    server = require('./src/server.js'),
    lab    = require('./src/laboratory.js'),
    async  = require('async'),
    colors = require('colors');

console.log('');

async.parallel([
    setup,
    server.start
], function (err) {

    lab.register(require('./src/tests/testHomePage'));
    lab.register(require('./src/tests/testLoginPage'));
    lab.register(require('./src/tests/testUsersPage'));
    lab.register(require('./src/tests/testSettingsPage'));
    lab.register(require('./src/tests/testServerPage'));

    if (err) {
        console.log(err.red);
        server.close();
        process.exit(1);
    } else {
        lab.summarize(function (success) {
            server.close();
            process.exit(success ? 0 : 1);
        });
    }
});