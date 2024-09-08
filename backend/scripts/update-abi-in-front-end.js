const fs = require('fs');
const path = require('path');

function main() {

    console.log(__dirname);
    const contractFilePath = path.resolve(__dirname, "../../frontend/src/pool_circle_contract.js");
    console.log(contractFilePath);

    const abiFilePath = path.resolve(__dirname, "../artifacts/contracts/PoolCircleAdmin.sol/PoolCircleAdmin.json");

    const abi = JSON.parse(fs.readFileSync(abiFilePath)).abi;
    const abiContent = "const abi = " + JSON.stringify(abi, null, 2);

    const addressFilePath = path.resolve(__dirname, "../shell-scripts/pool-circle-admin-contract-address.txt");

    const addressContent = "const address = \"" + fs.readFileSync(addressFilePath) + "\"";

    // Read the contract file
    let contractContent = fs.readFileSync(contractFilePath, 'utf8');

    // Define the placeholders for the replacement
    const startPlaceholderAbi = '// begin: pool-circle-admin abi';
    const endPlaceholderAbi = '// end: pool-circle-admin abi';

    const startPlaceholderAddress = '// begin: pool-circle-admin contract address';
    const endPlaceholderAddress = '// end: pool-circle-admin contract address';

    // Regular expression to match the content between the placeholders
    const regexAbi = new RegExp(`${startPlaceholderAbi}[\\s\\S]*${endPlaceholderAbi}`, 'g');
    const regexAddress = new RegExp(`${startPlaceholderAddress}[\\s\\S]*${endPlaceholderAddress}`, 'g');

    // Replace the section in the contract file with the ABI content
    contractContent = contractContent.replace(regexAbi, `${startPlaceholderAbi}\n${abiContent}\n${endPlaceholderAbi}`);
    contractContent = contractContent.replace(regexAddress, `${startPlaceholderAddress}\n${addressContent}\n${endPlaceholderAddress}`);

    // Write the modified contract content back to the file
    fs.writeFileSync(contractFilePath + ".tmp", contractContent, 'utf8');

    // remove the original file
    fs.unlinkSync(contractFilePath);

    // rename the file
    fs.renameSync(contractFilePath + ".tmp", contractFilePath);

    console.log('Successfully replaced ABI content in circle_contract.js');
}

main();
