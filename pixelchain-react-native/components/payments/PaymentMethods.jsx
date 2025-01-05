import { View, Text, Button } from "react-native";
import React, { useCallback, useState } from "react";
import { useWalletConnectModal } from "@walletconnect/modal-react-native";
import { ethers } from "ethers";

export default function PaymentMethods({address}) {
  const { isConnected, provider } = useWalletConnectModal();

  const handlePay = useCallback(async () => {
    if (!isConnected) {
      alert("Please connect your wallet first.");
      return;
    }

    try {
      // 1. Create an ethers provider from the raw walletconnect provider
      const web3Provider = new ethers.providers.Web3Provider(provider);

      // 2. Get the signer
      const signer = web3Provider.getSigner();

      // 3. Build transaction parameters
      const recipient = ""; // your recipient address
      const txParams = {
        to: recipient,
        value: ethers.utils.parseEther("0.01"), // example: send 0.01 ETH
      };

      // 4. Send transaction (this should prompt the wallet to confirm)
      const txResponse = await signer.sendTransaction(txParams);
      console.log("Transaction sent:", txResponse.hash);

      // 5. Wait for the transaction to be mined
      const receipt = await txResponse.wait();
      console.log("Transaction confirmed:", receipt.transactionHash);

      // If you need any post-payment logic, do it here (e.g., mark user as "paid")
    } catch (error) {
      console.error("Transaction failed:", error);
      alert(`Transaction failed: ${error?.message ?? error}`);
    }
  }, [isConnected, provider]);

  return (
    <View>
        <Text>Payment Card</Text>
      <Button title="Pay 0.01 ETH" onPress={handlePay} />
    </View>
  );
}
