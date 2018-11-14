const { Pool, Client } = require('pg');

const pool = new Pool({
    connectionString: global.properties.db
});

exports.insertAddress = function(address,oracle,abi) {
    pool.query('INSERT INTO oracle_address(address,oracle,abi) VALUES($1,$2,$3)', [address, oracle, abi], (err, res) => {
        //console.log(err, res);
        console.log("> insert oracle_address in db");
    });
}

exports.getAllAddress = function(callback) {
    pool.query('select * from oracle_address', (err, res) => {
        console.log("> get all address error:"+err);
        console.log("> get all address:"+res.rows.length);
        global.allAddress = res.rows;
        callback(null,"allAddress");
    })
}
