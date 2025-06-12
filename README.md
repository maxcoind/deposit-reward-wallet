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
