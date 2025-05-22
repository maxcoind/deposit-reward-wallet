---
applyTo: 'contracts/*.sol'
---

## Facts

- State variables must be private.
- Use openzeppelin for basic staff
- Please not use global import of path. Specify names to import individually or bind all exports of the module into a name.

## Header

- always add pragma to start of file: pragma solidity ^0.8.28;
- always add MIT license at start of the file: SPDX-License-Identifier: MIT

```solidity
pragma solidity ^0.8.28;
```

```solidity
 // SPDX-License-Identifier: MIT
```

## Examples

### ExampleContract.sol

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

### BasicERC20.sol

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import { ERC20 } from '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import { Ownable } from '@openzeppelin/contracts/access/Ownable.sol';

/// @title BasicERC20 Token
/// @notice Implementation of the basic ERC20 token with mint and burn capabilities
/// @dev Extends OpenZeppelin's ERC20 and Ownable contracts
contract BasicERC20 is ERC20, Ownable {
  // State variables
  uint8 private immutable _decimalsOverride;

  /// @notice Creates a new BasicERC20 token
  /// @param name_ The name of the token
  /// @param symbol_ The symbol of the token
  /// @param decimals_ The number of decimals for the token
  /// @dev Validates input parameters and initializes the token
  constructor(string memory name_, string memory symbol_, uint8 decimals_) ERC20(name_, symbol_) Ownable(msg.sender) {
    require(bytes(name_).length > 0, 'Name cannot be empty');
    require(bytes(symbol_).length > 0, 'Symbol cannot be empty');
    _decimalsOverride = decimals_;
  }

  /// @notice Returns the number of decimals used for token amounts
  /// @return The number of decimals
  function decimals() public view virtual override returns (uint8) {
    return _decimalsOverride;
  }

  /// @notice Mints new tokens
  /// @param to The address that will receive the minted tokens
  /// @param amount The amount of tokens to mint
  /// @dev Only callable by the owner
  function mint(address to, uint256 amount) public onlyOwner {
    require(to != address(0), 'Mint to zero address');
    _mint(to, amount);
  }

  /// @notice Burns tokens from the caller's balance
  /// @param amount The amount of tokens to burn
  function burn(uint256 amount) public virtual {
    _burn(_msgSender(), amount);
  }

  /// @notice Burns tokens from a specific account
  /// @param account The account whose tokens will be burned
  /// @param amount The amount of tokens to burn
  /// @dev Only callable by the owner
  function burnFrom(address account, uint256 amount) public virtual {
    require(account != address(0), 'Burn from zero address');
    _spendAllowance(account, _msgSender(), amount);
    _burn(account, amount);
  }
}
```
