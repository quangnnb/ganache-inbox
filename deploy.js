const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');
// define Infura Provider
const provider = new HDWalletProvider(
    'another great often primary warm panda island wolf extra raccoon nut become',
    'https://goerli.infura.io/v3/acbf3c26558c4df49b8f58b746522316'
    );
//initialize web3 instance with Infura provider
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    // debug 
    console.log('Attempting to deploy from account',accounts[0]);
    // declaration and deploy new solidity contract (Inbox) to Golier network
    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode, arguments:['Hi there!']})
        .send({gas: '1000000', from:accounts[0]});
    // debug
    console.log('Contract deployed to', result.options.address);
    provider.engine.stop()
};
deploy();