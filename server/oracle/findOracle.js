var CronJob = require('cron').CronJob;

exports.create =  function(callback) {
    loadOracles(callback);
}

function startOracle(oracle) {
    var oracleF = require(global.properties.path_oracles+"/"+oracle.file);
    oracleF.setOracleV(oracle);
    setCron(oracle.cron,oracleF.callCron);
}

function setCron(time, call) {
    new CronJob(time, call, null, true, null);
}

function loadOracles(callback) {
    var oracles = global.properties.oracleFile;
    for (i=0;i< oracles.length;i++)  {
        var oracle = oracles[i];
        console.log("> load oracle "+oracle.name+" "+oracle.file)
        startOracle(oracle);
        //if(oracleName === oracle.name) return global.properties.path_oracles+"/"+oracle.file
    }
    callback(null,"load oracles");
}



