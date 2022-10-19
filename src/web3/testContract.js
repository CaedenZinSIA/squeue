const fs = require('fs');
const Web3 = require('web3');
const Tx = require('ethereumjs-tx')

// Connect to local Ethereum node
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const abi = JSON.parse(fs.readFileSync('./src/web3/contract/artifact/KrisToken.sol/krisToken.json', 'utf-8'));
const bytecode = JSON.parse(fs.readFileSync('./src/web3/contract/artifact/KrisToken.sol/bytecode.json', 'utf-8'));

// Contract object
const contract = new web3.eth.Contract(abi, {
    from: web3.eth.coinbase, // default from address
    gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
});
web3.eth.getBalance('0x627306090abaB3A6e1400e9345bC60c78a8BEf57').then(function(value) {console.log(web3.utils.fromWei(value,'ether'))})

/* var account */
/* web3.eth.personal.getAccounts() */
/* .then(accounts => { */
/*   account = accounts[0]; */
/*   console.log("using account " + account) */
/*   return web3.eth.personal.unlockAccount(account) */
/* }) */


/* console.log(contract) */
/* web3.eth.personal.unlockAccount(address) */

/**/
var privateKey = '0xae6ae8e5ccbfb04590405997ee2d52d2b330726137b875053c36d94e974d162f'
web3.eth.accounts.wallet.add(privateKey);
var address = '0xf17f52151EbEF6C7334FAD080c5704D77216b732'

/* contract.deploy({data:bytecode.object}).send({ from: address, gas:'5000000',gasPrice: '0' }).on('receipt', function(receipt){ */
/*    console.log(receipt.contractAddress) // contains the new contract address */
/* }).then(() => console.log("done")).catch(err => console.log(err.stack)) */
/**/

/* const owner = new web3.eth.Contract(abi,'0xA9F8FeF0B3DF9159F1443427dAa79210fCEB009C') */
/* owner.methods.getOwner().call(function (err, res) { */
/*   if (err) { */
/*     console.log("An error occured", err) */
/*     return */
/*   } */
/*   console.log("The Owner is: ", res) */
/* }) */


const krisToken = new web3.eth.Contract(abi,'0x2C2B9C9a4a25e24B174f26114e8926a9f2128FE4')
/* krisToken.methods.getOwner().call(function (err, res) { */
/*   if (err) { */
/*     console.log("An error occured", err) */
/*     return */
/*   } */
/*   console.log("The Owner is: ", res) */
/* }) */

const tokenUri = "https://gateway.pinata.cloud/ipfs/QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP"

const owner = '0x627306090abaB3A6e1400e9345bC60c78a8BEf57'
const ownerKey = 'c87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3'




// Call mintNFT function
const mintNFT = async () => {
  const networkId = await web3.eth.net.getId()

  const tx = krisToken.methods.safeMint(owner,tokenUri)

  const gas = await tx.estimateGas({from:owner})

  const gasPrice = await web3.eth.getGasPrice()
  const data = tx.encodeABI()
  const nonce = await web3.eth.getTransactionCount(owner)
  
  const signedTx = await web3.eth.accounts.signTransaction({
    to:krisToken.options.address,
    data,
    gas,
    gasPrice,
    nonce,
    chainId:networkId
  },
  ownerKey)
  
  const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction)
  console.log(`transaction hash: ${receipt.transactionHash}`)
  /*   krisToken.methods.safeMint(address, tokenUri).estimateGas({from:owner}).then(function(gasAmount){ */
  /*   console.log(gasAmount) */
  /*   krisToken.methods.safeMint(address,tokenUri).send({from:owner,gas:gasAmount}).then(function(){ */
  /*     console.log('NFT Minted') */
  /*   }) */
  /* }) */

    /* krisToken.methods.safeMint(address, tokenUri).send({from:address,gas:5000000}) */
    /* console.log(`NFT Minted!`) */
}


const balanceOf = () => {
    krisToken.methods.balanceOf(owner).call(function (err, res) {
      if (err) {
        console.log("An error occured", err)
        return
      }
      console.log("The balance is: ", res)
    })
}
mintNFT()


balanceOf()
// Deploy contract instance
/* const contractInstance = contract.new({ */
/*     data: '0x' + bytecode, */
/*     from: web3.eth.coinbase, */
/*     gas: 90000*2 */
/* }, (err, res) => { */
/*     if (err) { */
/*         console.log(err); */
/*         return; */
/*     } */
/**/
/*     // Log the tx, you can explore status with eth.getTransaction() */
/*     console.log(res.transactionHash); */
/**/
/*     // If we have an address property, the contract was deployed */
/*     if (res.address) { */
/*         console.log('Contract address: ' + res.address); */
/*         // Let's test the deployed contract */
/*         testContract(res.address); */
/*     } */
/* }); */

// Quick test the contract


function testContract(address) {
    // Reference to the deployed contract
    const token = contract.at(address);
    // Destination account for test
    const dest_account = '0x002D61B362ead60A632c0e6B43fCff4A7a259285';

    // Assert initial account balance, should be 100000
    const balance1 = token.balances.call(web3.eth.coinbase);
    console.log(balance1 == 1000000);

    // Call the transfer function
    token.transfer(dest_account, 100, {from: web3.eth.coinbase}, (err, res) => {
        // Log transaction, in case you want to explore
        console.log('tx: ' + res);
        // Assert destination account balance, should be 100 
        const balance2 = token.balances.call(dest_account);
        console.log(balance2 == 100);
    });
}
