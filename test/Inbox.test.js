//declaration needed module
const assert = require("assert");
const ganache = require("ganache-cli"); // local test network
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
const  { interface, bytecode } = require('../compile');

let accounts; // ganache test accounts
let inbox;    // solidity contract 

beforeEach(async () => {
  // Get a list of all accounts pre-set in ganache network automatically
  accounts = await web3.eth.getAccounts();

  // Use one of those accounts to deploy the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({  
      data:bytecode,
      arguments:['Hi there!']}) // tells web3 that we want to deploy a new copy of this contract
    .send({ 
      from: accounts[0], 
      gas:'1000000'}); // instructs web3 to send out a transaction that create this contract
  });
  
// The following is 3 test cases of solidity contract Inbox.
describe("Inbox", () => {
  it("Deploys a contract ", () => {
    assert.ok(inbox.options.address); // if address is existed, assume that the deploying successful
  });

  it('Has a defautl message', async () => {
    // get the default message by calling message() method (default method)
    const message = await inbox.methods.message().call();
    // compare the retrieved message and the default message
    assert.equal(message, "Hi there!");
  });

  it('Test SetMessage method', async ()=> {
    await inbox.methods.setMessage("Bye") // we dont have to check the process of sending because if error occured, errors will be catched
      .send({from: accounts[0]}); // we have to clarify the one who will pay for changing the contract's data
    const newMessage  = await inbox.methods.message().call();
    assert.equal(newMessage, "Bye");
  });
});
