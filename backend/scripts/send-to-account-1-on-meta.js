const { ethers } = require('ethers');

async function main() {
    // Connect to the local Ganache blockchain
    const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545");

    // Use the first account to send ETH
    const senderPrivateKey = '0x5de84472c585803d6d95ff69541597a8528fc3270556d422236d17b424d95a9a';
    const senderWallet = new ethers.Wallet(senderPrivateKey, provider);

    // Set the recipient address
    const recipientAddress = '0x1172376dEcC029F2aCB069Cec1C32090d74646b0';

    // Specify the amount to send (10 ETH in this example)
    const amountInEth = "1.1";
    const amountInWei = ethers.parseEther(amountInEth);

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