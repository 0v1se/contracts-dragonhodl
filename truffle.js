var TrezorProvider = require("@daonomic/trezor-web3-provider");

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      provider: () => TrezorProvider("http://ether-dev.roborox.ru:8545", "m/44'/1'/0'/0/0"),
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
