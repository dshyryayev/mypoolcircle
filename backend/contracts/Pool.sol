// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24 <0.9.0;

contract Pool {
    uint256 public poolID;
    string public name;
    string public description;
    address public poolAdmin;
    address[] public poolMembers;

    constructor(
        uint256 _poolID,
        string memory _name,
        string memory _description,
        address _poolAdmin
    ) {
        poolID = _poolID;
        name = _name;
        description = _description;
        poolAdmin = _poolAdmin;
        poolMembers.push(_poolAdmin);
    }

    function addMember(address newMember) external {
        require(msg.sender == poolAdmin, "Only pool admin can add members");
        poolMembers.push(newMember);
    }

    function createEvent(string memory eventName, uint256 eventDate) external {
        // Implement event creation logic
    }

    function payout(address payable recipient, uint256 amount) external {
        // Implement payout logic
    }
}
