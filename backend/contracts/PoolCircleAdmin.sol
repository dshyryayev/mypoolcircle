// SPDX-License-Identifier: MIT

pragma solidity >=0.8.24 <0.9.0;

contract PoolCircleAdmin {
    address public admin;
    mapping(address => bool) public members;

    event MemberJoined(address indexed member, uint256 joinedAt);

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "only admin can call this function");
        _;
    }

    function changeAdmin(address newAdmin) public onlyAdmin {
        admin = newAdmin;
    }

    function addNewMember() public {
        require(!members[msg.sender], "you are already a member");
        members[msg.sender] = true;
        emit MemberJoined(msg.sender, block.timestamp);
    }
}
