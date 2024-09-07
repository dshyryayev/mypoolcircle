// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24 <0.9.0;

import "./Pool.sol";
import "./concrete_pools/BasicPool.sol";
import "./concrete_pools/PremiumPool.sol";
import "./concrete_pools/EnterprisePool.sol";

contract PoolFactory {
    enum PoolType {
        Basic,
        Premium,
        Enterprise
    }

    mapping(string => PoolType) private poolTypeMap;

    event PoolCreated(
        address indexed poolAddress,
        string name,
        PoolType poolType
    );

    constructor() {
        initializePoolTypeMap();
    }

    function initializePoolTypeMap() internal {
        poolTypeMap["Basic"] = PoolType.Basic;
        poolTypeMap["Premium"] = PoolType.Premium;
        poolTypeMap["Enterprise"] = PoolType.Enterprise;
    }

    function createPool(
        string memory name,
        string memory description,
        string memory poolTypeString,
        address poolAdminAddress
    ) external returns (address) {
        PoolType poolType = poolTypeMap[poolTypeString];
        require(
            poolType < PoolType.Enterprise || poolType == PoolType.Enterprise,
            "invalid pool type"
        );

        Pool newPool;
        if (poolType == PoolType.Basic) {
            newPool = new BasicPool(name, description, poolAdminAddress);
        } else if (poolType == PoolType.Premium) {
            newPool = new PremiumPool(name, description, poolAdminAddress);
        } else {
            newPool = new EnterprisePool(name, description, poolAdminAddress);
        }

        emit PoolCreated(address(newPool), name, poolType);
        return address(newPool);
    }
}
