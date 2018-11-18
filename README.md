# BlockNap Oracle Server
# Version 0.1.0

 1.Create account in https://infura.io/
    
 2.Create wallet in https://www.myetherwallet.com/
    
 3.Get ether in http://faucet.ropsten.be:3001/
    
 4.Clone repository.
    
 5.Install nodeJS libraries. Execute "npm install" in folder.
    
 6.Edit configuration file

 - ADDRESS_WALLET = Address of wallet create
 - PRIVATE_KEY_WALLET = Private key of wallet
 - PRIVATE_KEY_INFURA = Private key of infura

```json
	{
	  "account": "ADDRESS_WALLET",
	  "port": 8888,
	  "private": "PRIVATE_KEY_WALLET",
	  "oracleFile": [
		{
		  "name": "httpWeather",
		  "file": "httpWeather.js",
		  "cron": "*/50 * * * * *",
		  "api": "https://api.openweathermap.org/data/2.5/weather?q=Madrid&appid=key_weather",
		  "temp":200
		}
	  ],
	  "provider_config": "PRIVATE_KEY_INFURA",
	  "provider":"infura_ropsten",
	  "gas": 21000,
	  "gasPrice": 1000000000,
	  "path_oracles":"../../oracle",
	  "db": "postgresql://root@localhost:26257/blocknap?sslmode=disable"
	}
```


7.Execute init.sh

### Prerequisites

 1. Install CockroachDB v2.0.6 
 
 https://www.cockroachlabs.com/docs/releases/v2.0.6.html

 2. Create data base *blocknap*
   
 3. Execute script create_table_oracle_address.sql



## Call Oracle Server


- URL - URL http://**ip_server**:**port**/oracle/v1/add/**name_oracle**/**address**/
  
- Header: Content-Type:application/json

- Body (ABI of Smart Contract):

```json
{
   "abi":"......"
}
```

## Add new oracle

1. In folder *oracle* copy httpWeather.js with other name

2. Modify cron method *callCron* with the logic of oracle to call know when call the smart contract

```javascript
exports.callCron = function () {
    //add logical oracle here
    try {
        //oracle to call http
        request(oracle.api, function (error, response, body) {
            var infoWeather = JSON.parse(body);
            if(executeSmartContract(infoWeather,oracle)) {
                if (global.allAddress.length != undefined && (global.allAddress.length != null && global.allAddress.length > 0)) {
                    for(i=0;i<global.allAddress.length;i++) {
                        var address = global.allAddress[i]
                        if(checkAddress(address)) {
                            callSmartContract(address.address,address.abi);
                        }
                    }
                }
            }
            console.log('> error request ', error); // Print the error if one occurred
            console.log('> statusCode request ', response && response.statusCode); // Print the response status code if a response was received
            console.log('> body request:', body); // Print the HTML for the Google homepage.
        });
    }
    catch(err) {
        console.log("> error call request "+err);
    }
}
```

3. Modify  method *callSmartContract* where you call the method or methods of the smart contract

```javascript
//call smart contract
function callSmartContract(address, abi)  {

    console.log("> call address:"+address+" abi:"+abi);
    var overrideOptions = {
        gasLimit: global.properties.gas,
        gasPrice: global.properties.gasPrice,
        nonce: 0,
        value: ethers.utils.parseEther('1.0')
    };

    var abi2 = JSON.parse(abi);
    var contract = new ethers.Contract(address,abi2.abi.abi , global.wallet);

    //var callPromise = contract.getFecha(overrideOptions);
    var callPromise = contract.getFecha();
    callPromise.then(function(value) {
        console.log("> call "+address+' Single Return Value :' + JSON.stringify(value));
        console.log("> info "+address+" - "+utils.toUtf8String(value.data));
    });

}
```


4. Add oracle to properties in section oracleFile (3 mandatory and the rest as developer needs)

```json
	{
		  "name": "<nameToCallFromManager>",
		  "file": "<nameNewFileJSOfOracle>",
			"cron": "<cron condition as usual>"
		}
```

5. Restart server