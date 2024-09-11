// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24 <0.9.0;

import "../Pool.sol";

// One Winner Pool implementation
// This pool implements a payout strategy where there is only one winner.
// Admin can change his role to a regular member.
// At least 1 approval for the payout scheme is required.
// Payout scheme is something that all members need to agree to.

contract OneWinnerPool is Pool {
    constructor(
        string memory name,
        string memory description,
        address poolAdmin
    ) Pool("one-winner-pool", name, description, poolAdmin) {}

    function payout(
        address payable recipient,
        uint256 amount
    ) external override {
        // Implement basic payout logic
    }
}
