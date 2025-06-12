import type { HardhatUserConfig } from 'hardhat/config';
import { vars } from 'hardhat/config';
import '@nomicfoundation/hardhat-foundry';
import '@nomiclabs/hardhat-solhint';
import 'solidity-docgen';
import('@ensdomains/hardhat-chai-matchers-viem');
import '@solidstate/hardhat-accounts';

// Replace toolbox
import '@nomicfoundation/hardhat-verify';
import '@nomicfoundation/hardhat-viem';
import '@nomicfoundation/hardhat-ignition-viem';
import 'hardhat-gas-reporter';
import 'solidity-coverage';

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import '@nomicfoundation/hardhat-network-helpers';
import 'hardhat-exposed';
import 'solidity-coverage';
import 'hardhat-abi-exporter';

chai.use(chaiAsPromised);

// end replace toolbox

const evmVersion = process.env.EVM_VERSION || 'prague';

const etherscan = {
  etherscan: {
    apiKey: {
      bsc: vars.has('BSCSCAN_KEY') ? vars.get('BSCSCAN_KEY') : '',
    },
  },
};

const bscNetwork = {
  bsc: {
    url: 'https://bsc-dataseed.binance.org/',
    chainId: 56,
    accounts: vars.has('PRIVATE_KEY') ? [vars.get('PRIVATE_KEY')] : [],
  },
};

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.28',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      evmVersion: evmVersion,
      viaIR: false,
      outputSelection: { '*': { '*': ['storageLayout'] } },
    },
  },
  networks: {
    hardhat: {
      hardfork: evmVersion,
      // Exposed contracts often exceed the maximum contract size. For normal contract,
      // we rely on the `code-size` compiler warning, that will cause a compilation error.
      allowUnlimitedContractSize: true,
      initialBaseFeePerGas: undefined,
      enableRip7212: true,
    },
    anvil: {
      url: 'http://localhost:8545',
      chainId: 31337,
      hardfork: evmVersion,
      allowUnlimitedContractSize: true,
      initialBaseFeePerGas: undefined,
      enableRip7212: true,
    },
    ...bscNetwork,
  },
  abiExporter: {
    path: './abi',
    runOnCompile: true,
    clear: true,
    flat: false,
    spacing: 2,
    pretty: true,
  },

  exposed: {
    imports: true,
    initializers: true,
    exclude: ['vendor/**/*', '**/*WithInit.sol'],
  },

  gasReporter: {
    enabled: false,
    currency: 'USD',
  },
  ...etherscan,
};

export default config;
