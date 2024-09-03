// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24 <0.9.0;

import "./Pool.sol";
import "./concrete_pools/BasicPool.sol";
import "./concrete_pools/PremiumPool.sol";
import "./concrete_pools/EnterprisePool.sol";

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

