const findOracle= require('./findOracle.js');

exports.startCron = function (callback) {
    findOracle.create(callback);
}

