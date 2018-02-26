var TrezorProvider = require("trezor-wallet-provider");
var ProviderEngine = require("web3-provider-engine");
var FiltersSubprovider = require('web3-provider-engine/subproviders/filters.js');
var HookedSubprovider = require('web3-provider-engine/subproviders/hooked-wallet.js');
var Web3Subprovider = require("web3-provider-engine/subproviders/web3.js");
var Web3 = require("web3");

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      provider: () => {
    	var engine = new ProviderEngine();
    	engine.addProvider(new TrezorProvider([parseInt("8000002c", 16), parseInt("80000001", 16), parseInt("80000000", 16), 0, 0]));
		engine.addProvider(new FiltersSubprovider());
		engine.addProvider(new Web3Subprovider(new Web3.providers.HttpProvider("http://ether-dev.roborox.ru:8545")));
		engine.start();
		return engine;
      },
      network_id: 3,
      from: "0x755d601426add61e8597c1eecf98a8c49247d723",
      gas: 2000000,
	  gasPrice: 3000000000
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
};
