const program = require('commander');
const wallet = require('./server/blockchain/ethereum/getWallet');
const oracles = require('./server/global/initOracles');
const fs = require('fs');
const async = require('async');

program
    .version('0.1.0')
    .option('-f, --file <value>', 'set file', './blocknap_oracle_server.json');

// must be before .parse() since
// node's emit() is immediate
program.on('--help', function(){
    console.log('')
    console.log('Examples:');
    console.log('');
    console.log('  - f blocknap_oracle_server.json');
});



program.parse(process.argv);

function load() {

    console.log("-------------------------------");
    console.log(" BlockNap Oracle Server v0.1.0");
    console.log("-------------------------------");
    async.series([
            function (callback) {
                console.log("> load properties "+program.file);
                const propertiesRaw = fs.readFileSync(program.file);
                global.properties = JSON.parse(propertiesRaw);
                //callCron all address of server
                global.allAddress = [];
                callback(null,"properties");
            }
        ],
        function (err, results) {
            console.log("> call "+results);
            initApp();
    });
}

function initApp() {

    async.series([
            function (callback) {
                wallet.setWallet(callback);
            },
            function (callback) {
                var db = require('./server/ddbb/oracle_address');
                db.getAllAddress(callback);
            },
            function (callback) {
                oracles.start(callback);
            },
            function (callback) {
                const express = require('./server/express/express');
                express.openServer(callback);
            }
        ],
        // optional callback
        function (err, results) {
            console.log("> series "+JSON.stringify(results));
        });

}

load();