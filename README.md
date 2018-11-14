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
