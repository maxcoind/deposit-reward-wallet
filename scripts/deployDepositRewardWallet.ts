import hre from 'hardhat';
import { getAddress, WalletClient } from 'viem';

// Deploy script

async function main() {
  const [owner]: WalletClient[] = await hre.viem.getWalletClients();
  if (!owner) {
    throw new Error('No wallet client found. Please ensure you have a wallet configured.');
  }
  console.log(`Deploying contracts with account: ${owner.account?.address}`);
  const token = getAddress('0x4eC8A5b59a5e00Fc3afe1D2E129C7BCbAB89C204');
  const target = getAddress('0x643D58cF4AF8f5fa32139981d85B8629802Bcd5E');
  const depositRewardWalletAddress = await hre.viem.deployContract('DepositRewardWallet', [token, target]);
  console.log(`DepositRewardWallet deployed at: ${depositRewardWalletAddress.address}`);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
