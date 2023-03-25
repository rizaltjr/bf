const ethers = require("ethers");
const Web3 = require("web3");
const bip39 = require("bip39");
const api = 'https://eth-mainnet.g.alchemy.com/v2/jZH_4oMWQF5tU9gRfS_ZTO2-dsipnl9H'
const provider = new Web3(new Web3.providers.HttpProvider(api));

async function main() {
  while (1) {
    var mnemonic = bip39.generateMnemonic();
    var wallet = ethers.Wallet.fromMnemonic(mnemonic);
    var address = wallet.address;
    var balance = await provider.eth.getBalance(address);

    if (balance !== '0')// eth in this account
    {
      // write mnemonic and address to cracked.txt
      const fs = require('fs')
      const content = mnemonic + '\n' + address + '\n' + balance + '\n'

      fs.appendFile('cracked.txt', content, err => {
        if (err) {
          console.error(err)
          return;
        }
      })
    }
    //    
    console.log(address);
    console.log("balance: ", balance);
  }
}

main()
  .then(() => {
    process.exit(0)
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
