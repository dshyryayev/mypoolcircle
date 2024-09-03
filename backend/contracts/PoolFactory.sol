// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24 <0.9.0;

import "./Pool.sol";

contract PoolFactory {
    enum PoolType { Basic, Premium, Enterprise }

    event PoolCreated(address indexed poolAddress, string name, PoolType poolType);

    function createPool(
        string memory name,
        string memory description,
        address poolAdmin,
        PoolType poolType
    ) external returns (address) {
        Pool newPool;

        if (poolType == PoolType.Basic) {
            newPool = new BasicPool(name, description, poolAdmin);
        } else if (poolType == PoolType.Premium) {
            newPool = new PremiumPool(name, description, poolAdmin);
        } else if (poolType == PoolType.Enterprise) {
            newPool = new EnterprisePool(name, description, poolAdmin);
        } else {
            revert("Invalid pool type");
        }

        emit PoolCreated(address(newPool), name, poolType);
        return address(newPool);
    }
}

// Basic Pool implementation
contract BasicPool is Pool {
    constructor(string memory name, string memory description, address poolAdmin) 
        Pool(1, name, description, poolAdmin) {}
    
    function createEvent(string memory eventName, uint256 eventDate) external override {
        // Implement basic event creation logic
    }

    function payout(address payable recipient, uint256 amount) external override {
        // Implement basic payout logic
    }
}

// Premium Pool implementation
contract PremiumPool is Pool {
    constructor(string memory name, string memory description, address poolAdmin) 
        Pool(2, name, description, poolAdmin) {}
    
    function createEvent(string memory eventName, uint256 eventDate) external override {
        // Implement premium event creation logic
    }

    function payout(address payable recipient, uint256 amount) external override {
        // Implement premium payout logic
    }
}

// Enterprise Pool implementation
contract EnterprisePool is Pool {
    constructor(string memory name, string memory description, address poolAdmin) 
        Pool(3, name, description, poolAdmin) {}
    
    function createEvent(string memory eventName, uint256 eventDate) external override {
        // Implement enterprise event creation logic
    }

    function payout(address payable recipient, uint256 amount) external override {
        // Implement enterprise payout logic
    }
}