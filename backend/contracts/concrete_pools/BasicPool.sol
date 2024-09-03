// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24 <0.9.0;

import "../Pool.sol";

// Basic Pool implementation
contract BasicPool is Pool {
    constructor(
        string memory name,
        string memory description,
        address poolAdmin
    ) Pool(1, name, description, poolAdmin) {}

    function createEvent(
        string memory eventName,
        uint256 eventDate
    ) external override {
        // Implement basic event creation logic
    }

    function payout(
        address payable recipient,
        uint256 amount
    ) external override {
        // Implement basic payout logic
    }
}
