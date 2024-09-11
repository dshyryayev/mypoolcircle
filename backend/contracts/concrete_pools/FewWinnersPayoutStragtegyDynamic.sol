// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24 <0.9.0;

import "../Pool.sol";

/*
read FewWinnersPayoutStragtegyDynamic-descripton.txt
*/
contract FewWinnersPayoutStragtegyDynamic is Pool {
    constructor(
        string memory name,
        string memory description,
        address poolAdmin
    )
        Pool(
            "few-winners-payout-stragtegy-dynamic",
            name,
            description,
            poolAdmin
        )
    {}

    function payout(
        address payable recipient,
        uint256 amount
    ) external override {
        // Implement premium payout logic
    }
}
