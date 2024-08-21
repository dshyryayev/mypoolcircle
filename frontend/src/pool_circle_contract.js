import { ethers } from "ethers";

const address = "0xebf780fe8842D97c73633bF0578F1913A447F241";
const abi = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "member",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "joinedAt",
                "type": "uint256"
            }
        ],
        "name": "MemberJoined",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "addNewMember",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "admin",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newAdmin",
                "type": "address"
            }
        ],
        "name": "changeAdmin",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "members",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];
const provider = new ethers.BrowserProvider(window.ethereum);

export const connect = async () => {
    await provider.send("eth_requestAccounts", []);;
    return getContractAndSigner();
}

export const getContractAndSigner = async () => {
    const signer = await provider.getSigner();
    console.log({ signer });
    const contract = new ethers.Contract(address, abi, signer);
    console.log({ contract });
    return { signer, contract };
}