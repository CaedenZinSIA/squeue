var Web3 = require('web3')
var Contract = require('web3-eth-contract');
var address = '0xf17f52151EbEF6C7334FAD080c5704D77216b732'
var privateKey = '0xae6ae8e5ccbfb04590405997ee2d52d2b330726137b875053c36d94e974d162f'
var contractAddress = '0xF12b5dd4EAD5F743C6BaA640B0216200e89B60Da'

web3 = new Web3('ws://localhost:8545');
web3.eth.defaultAccount = address

console.log(web3.eth.defaultAccount);

var abi = require('./contract.json')




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

testContract(contractAddress)
