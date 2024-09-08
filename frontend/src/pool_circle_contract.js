import { ethers } from "ethers";

// begin: pool-circle-admin contract address
const address = "0x362Eeb129F99410bc460BcC7057640949625c4d7"
// end: pool-circle-admin contract address

// begin: pool-circle-admin abi
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
        "name": "poolAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "poolType",
        "type": "string"
      }
    ],
    "name": "PoolCreated",
    "type": "event"
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
    "name": "RegisteredUserJoined",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "adminAddress",
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
        "name": "newAdminAddress",
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
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "poolType",
        "type": "string"
      }
    ],
    "name": "createPool",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "poolFactory",
    "outputs": [
      {
        "internalType": "contract IPoolFactory",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "registerUser",
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
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "registeredPools",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "poolID",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "createdAt",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "poolAdmin",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "poolContractAddress",
        "type": "address"
      },
      {
        "internalType": "contract Pool",
        "name": "poolContract",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "poolType",
        "type": "string"
      }
    ],
    "stateMutability": "view",
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
    "name": "registeredUsers",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_poolFactory",
        "type": "address"
      }
    ],
    "name": "setPoolFactory",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
// end: pool-circle-admin abi

const provider = new ethers.BrowserProvider(window.ethereum);

export const connect = async () => {
  await provider.send("eth_requestAccounts", []);
  return getContractAndSigner();
}

export const getContractAndSigner = async () => {
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(address, abi, signer);
  return { signer, contract };
}