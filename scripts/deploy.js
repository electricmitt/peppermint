const { ethers } = require("hardhat"); // imports ether library from hardhat
const hre = require("hardhat");
const fs = require("fs"); // a provider (Node or proxy service) and a signer (the address that signs off on those contracts) using the smart contract code and deploys it to the network.

async function main() {
  const [deployer] = await ethers.getSigners(); //gives us a list of signers
  const balance = await deployer.getBalance(); //balance of particular signer
  const Marketplace = await hre.ethers.getContractFactory("NFTMarketplace");
  const marketplace = await Marketplace.deploy();

  await marketplace.deployed(); //event that tells us that marketplace has now been deployed


  //saves data of execution. the address of the smart contract and the abi
  const data = {
    address: marketplace.address,
    abi: JSON.parse(marketplace.interface.format('json'))
  }

  //This writes the ABI and address to the mktplace.json
  fs.writeFileSync('./src/Marketplace.json', JSON.stringify(data))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
