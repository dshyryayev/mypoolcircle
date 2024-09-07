const { ethers } = require("ethers");
const env = require('dotenv');
const fs = require("fs");
const path = require('path');

const deployContract = async () => {

  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545");

  const signer = await provider.getSigner(0);

  signerAddress = await signer.getAddress();

  console.log('signer address:', signerAddress);

  // adjust the path
  const artPath = path.resolve(__dirname);

  const artifactsPath = path.resolve(artPath, '../artifacts/contracts/PoolCircleAdmin.sol/PoolCircleAdmin.json');

  const abi = JSON.parse(fs.readFileSync(artifactsPath)).abi;

  // save the abi to a file
  fs.writeFileSync("./pool-circle-admin-abi.json", JSON.stringify(abi));

  const bytecode = JSON.parse(fs.readFileSync(artifactsPath)).bytecode;

  // Create a ContractFactory

  const envPath = path.resolve(__dirname, '.env');
  console.log(envPath);

  env.config({ path: envPath });

  const privateKey = process.env.LOCAL_SIGNER_PRIVATE_KEY;
  const wallet = new ethers.Wallet(privateKey, provider);

  const contractFactory = new ethers.ContractFactory(abi, bytecode, wallet);

  // Deploy the contract
  console.log('deploying the contract...');
  const contractPending = await contractFactory.deploy();

  const contract = await contractPending.waitForDeployment();

  const contractAddress = await contract.getAddress();

  // save the contract address to a file
  fs.writeFileSync("./pool-circle-admin-contract-address.txt", contractAddress);

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