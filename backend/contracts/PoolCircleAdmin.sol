// SPDX-License-Identifier: MIT

pragma solidity >=0.8.24 <0.9.0;

import "./Pool.sol";

interface IPoolFactory {
    function createPool(
        string memory name,
        string memory description,
        string memory poolType,
        address poolAdmin
    ) external returns (address);
}

contract PoolCircleAdmin {
    // admin - is current Main admin
    // members - is current Main members

    uint256 private poolCounter;

    address public adminAddress;
    mapping(address => bool) public registeredUsers;

    event RegisteredUserJoined(address indexed member, uint256 joinedAt);
    event PoolCreated(
        address indexed poolAddress,
        string name,
        string poolType
    );

    struct CirclePool {
        uint256 poolID;
        string name;
        string description;
        uint256 createdAt;
        address[] poolMembers;
        address poolAdmin;
        address poolContractAddress;
        Pool poolContract;
        string poolType; // Add this line
    }

    // the "address" here is a creator of the pool or poolAdmin
    mapping(address => CirclePool[]) public registeredPools;

    constructor() {
        adminAddress = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == adminAddress, "only admin can call this function");
        _;
    }

    modifier isRegisteredUser() {
        require(registeredUsers[msg.sender], "you are not a member");
        _;
    }

    function changeAdmin(address newAdminAddress) public onlyAdmin {
        adminAddress = newAdminAddress;
    }

    IPoolFactory public poolFactory;

    function setPoolFactory(address _poolFactory) external onlyAdmin {
        poolFactory = IPoolFactory(_poolFactory);
    }

    function createPool(
        string memory name,
        string memory description,
        string memory poolType // Add this parameter
    ) external isRegisteredUser {
        address poolAdminAddress = msg.sender;
        poolCounter++;

        // Call the PoolFactory function to create a new pool
        address newPoolAddress = poolFactory.createPool(
            name,
            description,
            poolType,
            poolAdminAddress
        );

        // Create a new CirlePool instance
        CirclePool memory newPool = CirclePool({
            poolID: poolCounter,
            name: name,
            description: description,
            createdAt: block.timestamp,
            poolMembers: new address[](1),
            poolAdmin: poolAdminAddress,
            poolContractAddress: newPoolAddress,
            poolContract: Pool(newPoolAddress),
            poolType: poolType
        });

        // Add the pool admin as the first member
        newPool.poolMembers[0] = poolAdminAddress;

        // Add the new pool to the registeredPools mapping
        registeredPools[poolAdminAddress].push(newPool);

        emit PoolCreated(newPoolAddress, name, poolType);
    }

    function registerUser() external {
        require(!registeredUsers[msg.sender], "you are already a member");
        registeredUsers[msg.sender] = true;
        emit RegisteredUserJoined(msg.sender, block.timestamp);
    }
}
