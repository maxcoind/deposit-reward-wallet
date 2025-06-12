// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface IJaxAdmin {
    function userIsGovernor(address _user) external view returns (bool);
}

// Interface for the target contract
interface IDepositor {
    function jaxAdmin() external view returns (IJaxAdmin);
    function deposit_reward(uint amount) external;
}

// Ownable contract for depositing rewards to another contract
contract DepositRewardWallet is Ownable {
    using SafeERC20 for IERC20;

    IERC20 public immutable token;
    IDepositor public immutable target;

    // Constructor sets token and target contract addresses
    constructor(address _token, address _target) Ownable(msg.sender) {
        require(_token != address(0), "Token address is zero");
        require(_target != address(0), "Target address is zero");
        token = IERC20(_token);
        target = IDepositor(_target);
    }

    // Deposit reward to the target contract
    function depositReward(uint256 amount) external {
        // Check if the caller is a governor
        require(target.jaxAdmin().userIsGovernor(tx.origin), "Caller is not a governor");
        uint256 balance = token.balanceOf(address(this));
        require(amount >= balance, "Amount must be less than or equal to balance");

        // Approve only the required amount for this transaction
        token.approve(address(target), amount);

        // Call deposit_reward on the target contract
        target.deposit_reward(amount);

        // Reset approval to zero for safety
        token.approve(address(target), 0);
    }
}
