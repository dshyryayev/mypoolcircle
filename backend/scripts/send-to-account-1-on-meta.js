const { ethers } = require('ethers');
const env = require('dotenv');
const path = require('path');
const fs = require('fs');

async function main() {
    // need to check what is the current folder
    console.log(__dirname);
    const envPath = path.resolve(__dirname, '.env');
    console.log(envPath);

    env.config({ path: envPath });

    // Connect to the local Ganache blockchain
    const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545");

    // Load the public key from an external file
    const publicKeyPath = path.resolve(__dirname, '../shell-scripts/signer-address.txt');
    const publicKey = fs.readFileSync(publicKeyPath, 'utf8').trim();

    console.log(`Loaded public key: ${publicKey}`);

    // Use the first account to send ETH
    const senderPrivateKey = process.env.LOCAL_SIGNER_PRIVATE_KEY;

    // validate that publicKey matches the private key
    const senderWallet = new ethers.Wallet(senderPrivateKey, provider);
    const senderAddress = senderWallet.address;

    if (senderAddress !== publicKey) {
        console.error('public key does not match the private key');
        console.log(`public key: ${publicKey}`);
        console.log(`sender address: ${senderAddress}`);
        // the message needs to be in "red"
        console.log('\x1b[31m%s\x1b[0m', 'set LOCAL_SIGNER_PRIVATE_KEY in .env');
        process.exit(1);
    }

    // Set the recipient address
    const recipientAddress = process.env.METAMASK_ACCOUNT1_ADDRESS;

    // Specify the amount to send (10 ETH in this example)
    const amountInEth = "1.5";
    const amountInWei = ethers.parseEther(amountInEth);

    // Check the balance of the sender before sending ETH
    const senderBalanceBefore = await provider.getBalance(senderAddress);
    console.log(`sender balance before transaction: ${ethers.formatEther(senderBalanceBefore)} ETH`);

    // Check the balance of the recipient before sending ETH
    const recipientBalanceBefore = await provider.getBalance(recipientAddress);
    console.log(`Recipient balance before transaction: ${ethers.formatEther(recipientBalanceBefore)} ETH`);

    // Send the ETH
    const tx = await senderWallet.sendTransaction({
        to: recipientAddress,
        value: amountInWei
    });

    // Wait for the transaction to be mined
    await tx.wait();

    console.log(`transaction successful: ${tx.hash}`);

}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
