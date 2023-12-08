require("@nomicfoundation/hardhat-toolbox")
require('dotenv').config();

module.exports = {
  solidity: "0.8.23",
  networks: {
    sepolia: {
      url: `${process.env.ALCHEMY_RINKEBY_URL}`,
      accounts: [`0x${process.env.METAMASK_PRIVATE_KEY}`],
    } 
  }
};