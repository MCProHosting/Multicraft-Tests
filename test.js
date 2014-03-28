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

    var files = fs.readdirSync('./src/tests');
    for (var i = 0, l = files.length; i < l; i++) {
        require('./src/tests/' + files[i].split('.').shift())();
    }

    if (err) {
        console.log(err.red);
        server.close();
    } else {
        lab.summarize(server.close);
    }
});