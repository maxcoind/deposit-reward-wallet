Create smart ownable smart contract, which call function for deposit reward from other contract with some amount of tokens.
Constructor: ERC20 token address, target contract address
use SafeTransfer
approve for each transaction separate

interface for deposit reward:

```solidity
interface IDepositor {
  function deposit_reward(uint amount) public;
}
```

Needs:

- nodejs
- pnpm
- foundry
- slither

Install husky
Configure documentation generator

```shell
git clone --depth=1 --branch=main https://github.com/maxcoind/solidity-boilerplate.git ct && rm -rf ./ct/.git && cd ct && git init
```

## What is inside?

- hardhat-foundry
- https://github.com/ensdomains/hardhat-chai-matchers-viem

## Folders:

[contracts](./contracts/) - Contracts sources
[test](./test/) - tests, may be hardhat(ts) or foundry(.t.sol) tests

### Autgenerated

[abi](./abi/) - Abi for smart contracts
[coverage](./coverage/) - tests coverage report

## PNPM Commands list

### Main commands

```shell
pnpm run lint
```

```shell
pnpm run compile
```

```shell
pnpm run clean
```

```shell
pnpm run docgen
```

```shell
pnpm run coverage
```
