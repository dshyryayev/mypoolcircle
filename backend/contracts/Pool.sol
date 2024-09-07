// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24 <0.9.0;

contract Pool {
    uint256 public poolID;
    string public name;
    string public description;
    address public poolAdmin;
    address[] public poolMembers;

    event MemberAdded(address newMember);

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

    modifier onlyPoolAdmin() {
        require(
            msg.sender == poolAdmin,
            "only pool admin can perform this action"
        );
        _;
    }

    function addMember(address newMember) external onlyPoolAdmin {
        poolMembers.push(newMember);
    }

    function createEvent(
        string memory eventName,
        uint256 eventDate
    ) external virtual {
        // Implement event creation logic
    }

    function addNewMember(address newMember) external onlyPoolAdmin {
        poolMembers.push(newMember);
        emit MemberAdded(newMember);
    }

    function getPoolMembers() external view returns (address[] memory) {
        return poolMembers;
    }

    function payout(
        address payable recipient,
        uint256 amount
    ) external virtual {
        // Implement payout logic
    }
}
