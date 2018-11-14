const express = require('express');
const app        = express();
app.use(express.json());
const router = express.Router();
const findOracle = require('../oracle/findOracle');
const dbAddress = require('../ddbb/oracle_address');
const address = require('../global/address');

exports.openServer = function (callback) {
    console.log("> Init Express");
    setRoute();
    app.listen(global.properties.port);
    console.log('> Open port ' + properties.port);
    callback(null,"open server");
}


function setRoute() {

    router.post('/add/:oracle/:address', function(req, res) {
        console.log("> add oracle "+req.params.address);
        console.log("> req: "+JSON.stringify(req.body));
        dbAddress.insertAddress(req.params.address,req.params.oracle,req.body);
        address.add(req.params.address,req.params.oracle,req.body);
    });

    app.use('/oracle/v1', router);

}

