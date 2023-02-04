//declaration
const assert = require("assert");
const ganache = require("ganache-cli");
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
    .deploy({  data:bytecode, arguments:['Hi there!']}) // tells web3 that we want to deploy a new copy of this contract
    .send({ from: accounts[0], gas:'1000000'}); // instructs web3 to send out a transaction that create this contract
  });
  

describe("Inbox", () => {
  it("Deploys a contract ", () => {
    console.log(inbox);
  });
});
