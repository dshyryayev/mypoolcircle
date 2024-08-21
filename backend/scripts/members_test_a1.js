const ethers = require("ethers");

const address = "0x91fEC2a2a43Bc0e06a025bf92cc873C2D868Bbd2";
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
//const provider = new ethers.BrowserProvider(window.ethereum);
const url = "http://127.0.0.1:7545";
const provider = new ethers.JsonRpcProvider(url)

const connect = async () => {
    //await provider.send("eth_requestAccounts", []);;
    return getContractAndSigner();
}

const getContractAndSigner = async () => {
    const signer = await provider.getSigner();
    console.log({ signer });
    const contract = new ethers.Contract(address, abi, signer);
    console.log({ contract });
    return { signer, contract };
}

async function main() {
    const { signer, contract } = await connect();
    console.log({ signer, contract });
    const address = await signer.getAddress();
    console.log({ address });
    const isMember = await contract.members(address);
    console.log({ isMember });
}

main();