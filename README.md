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
