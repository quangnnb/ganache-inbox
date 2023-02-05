#########ENVIRONMENT SETTING##############
##########################################
# initial environment
$>npm init

# install mocha, web3 and ganache module
$> npm install mocha ganache-cli web3

# install solidity compiler version 0.4.17
$> npm install solc@0.4.17

# install truffle HD wallet provider for communicate with Infura
$>npm install @truffle/hdwallet-provider

########COMPILE & RUN TEST################
##########################################
#compile solidity contract
$>node compile.js 

# executing test
$> npm run test
