import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useWalletConnectModal } from "@walletconnect/modal-react-native";
import { ethers } from "ethers";

export default function PaymentMethods({ address }) {
  const [paymentStatus, setPaymentStatus] = useState(false);
  const { isConnected, provider } = useWalletConnectModal();
  const walletAddress = "0x71eb5156a09fBA7fF368bC9A2e2c06DCC78F6572"; // your wallet address

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
      const recipient = walletAddress; // your recipient address
      const txParams = {
        to: recipient,
        value: ethers.utils.parseEther("0.01"), // example: send 0.01 ETH
      };

      // 4. Send transaction (this should prompt the wallet to confirm)
      const txResponse = await signer.sendTransaction(txParams);
      console.log("Transaction sent:", txResponse.hash);

      // 5. Wait for the transaction to be mined
      const receipt = await txResponse.wait();
      await SecureStore.setItemAsync("payment", true);
      console.log("Transaction confirmed:", receipt.transactionHash);

      // If you need any post-payment logic, do it here (e.g., mark user as "paid")
    } catch (error) {
      console.error("Transaction failed:", error);
      alert(`Transaction failed: ${error?.message ?? error}`);
    }
  }, [isConnected, provider]);

  const getPaymentStatus = async () => {
    const paymentStatus = await SecureStore.getItemAsync("payment");
    if (paymentStatus) {
      setPaymentStatus(true);
    }
    console.log("Payment status:", paymentStatus);
  };

  useEffect(() => {
    getPaymentStatus();
  }, []);

  return (
    <>
      {paymentStatus ? (
        <View className="flex justify-center items-center" style={styles.card}>
          <Text style={styles.title}>Payment Successful</Text>
          <Text style={styles.value}>Thank you for your payment!</Text>
        </View>
      ) : (
        <View style={styles.card}>
          <Text style={styles.title}>Payments</Text>
          <View style={styles.details}>
            <Text style={styles.label}>Wallet Address(To):</Text>
            <Text style={styles.value}>{walletAddress}</Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.label}>Amount to Pay:</Text>
            <Text style={styles.value}>0.01 ETH</Text>
          </View>
          <TouchableOpacity style={styles.payButton} onPress={handlePay}>
            <Text style={styles.payButtonText}>Pay Now</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  details: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: "#555",
  },
  value: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
  },
  payButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  payButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
