const { ethers } = require("ethers");
const env = require('dotenv');
const fs = require("fs");

const main = async () => {
    const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545");
    const signer = await provider.getSigner(0);
    const signerAddress = await signer.getAddress();
    console.log("signer address:", signerAddress);

    // save the signer address to a file
    fs.writeFileSync("./signer-address.txt", signerAddress);
}

main();