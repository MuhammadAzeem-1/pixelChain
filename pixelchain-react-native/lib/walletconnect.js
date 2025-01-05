import { EthereumProvider } from '@walletconnect/ethereum-provider';

let provider;

export const initWalletConnect = async () => {
  provider = await EthereumProvider.init({
    projectId: 'YOUR_PROJECT_ID', // Replace with your project ID
    chains: [1], // Ethereum mainnet chain ID
    optionalChains: [5], // Optional: Goerli testnet for testing
    showQrModal: true,
  });
};

export const connectWallet = async () => {
  if (!provider) {
    await initWalletConnect();
  }
  const accounts = await provider.enable();
  return accounts[0]; // Return the connected wallet address
};

export const sendTransaction = async (to, value) => {
  if (!provider) {
    throw new Error('Provider not initialized');
  }

  const ethersProvider = new ethers.providers.Web3Provider(provider);
  const signer = ethersProvider.getSigner();

  const transaction = {
    to,
    value: ethers.utils.parseEther(value), // Convert ETH value to Wei
  };

  const txResponse = await signer.sendTransaction(transaction);
  return await txResponse.wait(); // Wait for transaction confirmation
};
