


exports.start = function (callback) {
    var oracle = require('../oracle/startOracle');
    oracle.startCron(callback);
}