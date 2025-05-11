import type { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-foundry';
import '@nomiclabs/hardhat-solhint';
import 'solidity-docgen';
// Replace toolbox
import '@nomicfoundation/hardhat-verify';
import '@nomicfoundation/hardhat-viem';
import '@nomicfoundation/hardhat-ignition-viem';
import 'hardhat-gas-reporter';
import 'solidity-coverage';

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import '@nomicfoundation/hardhat-network-helpers';

chai.use(chaiAsPromised);

// end replace toolbox

const config: HardhatUserConfig = {
  solidity: '0.8.28',
  gasReporter: {
    enabled: false,
    currency: 'USD',
  },
};

export default config;
