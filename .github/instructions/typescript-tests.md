---
applyTo: 'test/*.test.ts'
---

- Disallow arrow functions as arguments to mocha functions

### Available additional chai matchers

- `expect(contract).read(...)`
- `expect(contract).write(...)`
- `expect(contract).transaction(...)`
- `.toBeReverted()`
- `.toBeRevertedWithCustomError(...)`
  - `.withArgs(...)`
- `.toBeRevertedWithoutReason()`
- `.toBeRevertedWithPanic(...)`
- `.toBeRevertedWithString(...)`
- `.toEmitEvent(...)`
  - `.withArgs(...)`
- `.toEmitEventFrom(...)`
  - `.withArgs(...)`

# Example

### contracts/ExampleContract.sol

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import { Ownable } from '@openzeppelin/contracts/access/Ownable.sol';

/// @notice Thrown when trying to interact with an invalid receiver address
/// @param receiver The invalid receiver address (typically zero address)
error InvalidReceiver(address receiver);

/// @title Example Contract
/// @notice Demonstrates basic token functionality with minting capabilities
/// @dev Inherits OpenZeppelin's Ownable for access control
contract ExampleContract is Ownable {
  /// @notice Emitted when tokens are minted
  /// @param to Address receiving the minted tokens
  /// @param value Amount of tokens minted
  event Mint(address indexed to, uint256 value);

  /// @dev Mapping of account balances
  /// @dev Using latest Solidity named parameter syntax
  mapping(address => uint256) private _balances;

  /// @notice Initializes the contract with owner
  /// @dev Sets msg.sender as the initial owner
  constructor() Ownable(msg.sender) {}

  /// @notice Returns the token balance of an account
  /// @param account Address to query the balance of
  /// @return Amount of tokens owned by the account
  function balanceOf(address account) public view returns (uint256) {
    return _balances[account];
  }

  function mint(address account, uint256 value) public onlyOwner {
    _mint(account, value);
  }

  /// @notice Internal function to mint new tokens
  /// @dev Reverts if account is zero address
  /// @param account Address to receive the minted tokens
  /// @param value Amount of tokens to mint
  function _mint(address account, uint256 value) internal {
    if (account == address(0)) {
      revert InvalidReceiver(address(0));
    }
    _balances[account] += value;
    emit Mint(account, value);
  }
}
```

### test/ExampleContract.t.ts

```typescript
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import hre from 'hardhat';
import { WalletClient, zeroAddress, getAddress } from 'viem';

describe('ExampleContract', function () {
  async function deployFixture() {
    const [owner, user1]: WalletClient[] = await hre.viem.getWalletClients();
    const example = await hre.viem.deployContract('ExampleContract', []);

    return { example, owner, user1 };
  }

  describe('Deployment', function () {
    it('Should set the correct owner', async function () {
      const { example, owner } = await loadFixture(deployFixture);
      expect(await example.read.owner()).toBe(getAddress(owner.account!.address));
    });
  });

  describe('Minting', function () {
    it('Should mint tokens correctly', async function () {
      const { example, user1 } = await loadFixture(deployFixture);
      console.log('Example:', typeof example);

      await expect(example)
        .write('mint', [user1.account!.address, 100n])
        .toEmitEvent('Mint')
        .withArgs(user1.account!.address, 100n);

      expect(await example.read.balanceOf([user1.account!.address])).toBe(100n);
    });

    it('Should revert when minting to zero address', async function () {
      const { example } = await loadFixture(deployFixture);

      await expect(example)
        .write('mint', [zeroAddress, 100n])
        .toBeRevertedWithCustomError('InvalidReceiver')
        .withArgs(zeroAddress);
    });

    it('Should revert when a non-owner tries to mint', async function () {
      const { example, user1 } = await loadFixture(deployFixture);

      await expect(example)
        .write('mint', [user1.account!.address, 100n], { account: user1.account })
        .toBeRevertedWithCustomError('OwnableUnauthorizedAccount')
        .withArgs(getAddress(user1.account!.address));
    });
  });

  describe('Balance', function () {
    it('Should return correct balance', async function () {
      const { example, user1 } = await loadFixture(deployFixture);

      await example.write.mint([user1.account!.address, 100n]);
      expect(await example.read.balanceOf([user1.account!.address])).toBe(100n);
    });
  });
});
```
