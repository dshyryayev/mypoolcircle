const { ethers, contractERC20 } = require("ethers");
const env = require('dotenv');
const fs = require("fs");

env.config();

const deployContract = async () => {

  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545");

  const signer = await provider.getSigner(0);

  signerAddress = await signer.getAddress();

  console.log('signer address:', signerAddress);

  const abi = JSON.parse(fs.readFileSync("artifacts/contracts/PoolCircleAdmin.sol/PoolCircleAdmin.json")).abi;
  const bytecode = JSON.parse(fs.readFileSync("artifacts/contracts/PoolCircleAdmin.sol/PoolCircleAdmin.json")).bytecode;

  // Create a ContractFactory

  const privateKey = process.env.LOCAL_SIGNER_PRIVATE_KEY;
  const wallet = new ethers.Wallet(privateKey, provider);

  const contractFactory = new ethers.ContractFactory(abi, bytecode, wallet);

  // Deploy the contract
  console.log('deploying the contract...');
  const contractPending = await contractFactory.deploy();

  const contract = await contractPending.waitForDeployment();

  const contractAddress = await contract.getAddress();

  console.log('contract deployed at address:', contractAddress);
  return { contract, abi };
};

async function main() {
  // Connect to the Ganache network

  const { contract, abi } = await deployContract();

}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});