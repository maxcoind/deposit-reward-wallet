---
applyTo: 'test/*.t.sol'
---

## Facts

- use forge to write tests
- In forge tests `testFail*` has been removed. Consider changing to test_Revert[If|When]\_Condition and expecting a revert.

## Header

- always add pragma to start of file: pragma solidity ^0.8.28;







### ExampleContract.t.sol

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import { Test } from 'forge-std/Test.sol';
import { ExampleContract, InvalidReceiver } from '../contracts/ExampleContract.sol';
import { Ownable } from '@openzeppelin/contracts/access/Ownable.sol';

contract ExampleContractTest is Test {
  ExampleContract private example;
  address private constant OWNER = address(0x1);
  address private constant USER1 = address(0x2);

  function setUp() public {
    vm.startPrank(OWNER);
    example = new ExampleContract();
    vm.stopPrank();
  }

  function test_Deployment() public view {
    assertEq(example.owner(), OWNER);
  }

  function test_Minting() public {
    vm.startPrank(OWNER);
    vm.expectEmit(true, false, false, true);
    emit ExampleContract.Mint(USER1, 100);
    example.mint(USER1, 100);
    assertEq(example.balanceOf(USER1), 100);
  }

  function test_RevertWhen_MintingToZeroAddress() public {
    vm.startPrank(OWNER);
    vm.expectRevert(abi.encodeWithSelector(InvalidReceiver.selector, address(0)));
    example.mint(address(0), 100);
  }

  function test_RevertWhen_NonOwnerMints() public {
    vm.startPrank(USER1);
    vm.expectRevert(abi.encodeWithSelector(Ownable.OwnableUnauthorizedAccount.selector, USER1));
    example.mint(USER1, 100);
  }

  function test_Balance() public {
    vm.startPrank(OWNER);
    example.mint(USER1, 100);
    assertEq(example.balanceOf(USER1), 100);
  }
}
```
