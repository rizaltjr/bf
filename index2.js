const ethers = require("ethers");
const Web3 = require("web3");
const bip39 = require("bip39");
const fs = require('fs');

const api = 'https://eth-mainnet.g.alchemy.com/v2/mYOTO9LFR0UAl71rQQFPjMSayKdUNzL5';

const provider = new Web3(new Web3.providers.HttpProvider(api));

// Baca daftar mnemonic dari file teks
const mnemonicList = fs.readFileSync('list_mnemonic.txt', 'utf-8').split('\n').filter(Boolean);

async function main() {
  for (const mnemonic of mnemonicList) {
    var wallet = ethers.Wallet.fromMnemonic(mnemonic);
    var address = wallet.address;
    var balance = await provider.eth.getBalance(address);

    if (balance !== '0') {
      // Tulis mnemonik dan alamat ke cracker.txt
      const content = `${mnemonic} ${address}\n`;

      fs.appendFile('cracker.txt', content, err => {
        if (err) {
          console.error(err);
          return;
        }
      });
    } else {
      // Tulis mnemonik dan alamat ke mnemonicByDusk.txt
      const content = `${mnemonic} ${address}\n`;

      fs.appendFile('mnemonicByDusk.txt', content, err => {
        if (err) {
          console.error(err);
          return;
        }
      });
    }

    console.log(address);
    console.log("saldo: ", balance);
  }
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
