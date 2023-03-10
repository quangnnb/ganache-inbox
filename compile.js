// declare the path module
const path = require("path");
// declare file system module
const fs = require("fs");
// declare solidity compiler module
const solc = require("solc");

// config source file 
const inboxPath = path.resolve(__dirname, "contracts", "Inbox.sol");
const source = fs.readFileSync(inboxPath, "utf8");

// compile the source file
module.exports  = solc.compile(source, 1).contracts[':Inbox'];
