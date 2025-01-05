import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { icons, images } from "../../constants";
import { Link, router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import {
  WalletConnectModal,
  useWalletConnectModal,
} from "@walletconnect/modal-react-native";
// import { PROJECT_ID } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PaymentMethods from "../../components/payments/PaymentMethods";
// new


const projectId = "e513dba993263d9dd590cdb6aeb4584f";

const providerMetadata = {
  name: "YOUR_PROJECT_NAME",
  description: "YOUR_PROJECT_DESCRIPTION",
  url: "https://your-project-website.com/",
  icons: ["https://your-project-logo.com/"],
  redirect: {
    native: "YOUR_APP_SCHEME",
    universal: "YOUR_APP_UNIVERSAL_LINK.com",
  },
};

const Profile = () => {
  const { open, isConnected, address, provider } = useWalletConnectModal();

  const logout = async () => {
    await SecureStore.deleteItemAsync("userPin");
    await AsyncStorage.clear();

    router.replace("/");
  };

  // Function to handle the
  const handleButtonPress = async () => {
    if (isConnected) {
      return provider?.disconnect();
    }
    return open();
  };

  return (
    <SafeAreaView className="bg-slate-100	 h-full mt-8">
      <>
        <View className="w-full flex justify-center items-center mt-6 mb-4 px-4">
          <TouchableOpacity
            onPress={logout}
            className="flex w-full items-end mb-10"
          >
            <Image
              source={icons.logout}
              resizeMode="contain"
              className="w-6 h-6"
            />
          </TouchableOpacity>

          <View className="w-16 h-16 border border-secondary rounded-lg flex justify-center items-center">
            <Image
              source={images.profile}
              className="w-[90%] h-[90%] rounded-xl"
              resizeMode="cover"
            />
          </View>

          <View className="mt-2">
            <Text className={`text-black text-center font-semibold text-lg`}>
              User 1
            </Text>

            <Text className="text-sm text-gray-100 text-center font-pregular">
              {address}
            </Text>
          </View>

          {/* <View className="flex flex-row items-center py-3">
            <Text className="text-base text-red-600">Bal. </Text>
            <Text className="text-2xl text-indigo-600 font-psemibold">
              0.2 ETH
            </Text>
          </View> */}
          <View style={[styles.container, styles.boxShadows]}>
            <Text style={styles.planTitle}>Free Plan</Text>

            {!isConnected ? (
              <TouchableOpacity
                onPress={handleButtonPress}
                activeOpacity={0.8}
                style={[styles.button, styles.connectButton]}
              >
                <Text style={[styles.buttonText, styles.connectText]}>
                  Connect Wallet
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={handleButtonPress}
                activeOpacity={0.8}
                style={[styles.button, styles.disconnectButton]}
              >
                <Text style={[styles.buttonText, styles.disconnectText]}>
                  Disconnect Wallet
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>


        <View>
          <PaymentMethods address={address}/>
        </View>

        <WalletConnectModal
          projectId={projectId}
          providerMetadata={providerMetadata}
        />
      </>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 16,
    marginVertical: 10,
  },
  planTitle: {
    fontSize: 20,
    fontWeight: "700",
    fontFamily: "System", // Customize with your font if applicable
    color: "#333333",
    marginBottom: 16,
  },
  button: {
    borderRadius: 10,
    minHeight: 50,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5, // For Android shadow
  },
  connectButton: {
    backgroundColor: "#4CAF50", // Green for connect
  },
  disconnectButton: {
    backgroundColor: "#F44336", // Red for disconnect
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "System", // Customize with your font if applicable
  },
  connectText: {
    color: "#ffffff",
  },
  disconnectText: {
    color: "#ffffff",
  },
  boxShadows: {
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },

  boxShadows: {
    shadowColor: "rgba(0, 0, 0, 0.16)",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.16,
    shadowRadius: 4,
    elevation: 6, // Adjust as needed for Android
  },
});

// const styles = StyleSheet.create({
//   boxShadows: {
//     shadowColor: "rgba(0, 0, 0, 0.16)",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.16,
//     shadowRadius: 4,
//     elevation: 6, // Adjust as needed for Android
//   },
// });
