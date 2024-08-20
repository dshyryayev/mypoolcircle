import { ethers } from "ethers";

const address = "";
const abi = [];
const provider = new ethers.providers.Web3Provider(window.ethereum);

export const connect = async () => {
    await provider.send("eth_requestAccounts", []);;
    return getContract();
}

export const getContract = async () => {
    const signer = provider.getSigner();
    const contract = new ethers.Contract(address, abi, signer);
    return { signer, contract };
}