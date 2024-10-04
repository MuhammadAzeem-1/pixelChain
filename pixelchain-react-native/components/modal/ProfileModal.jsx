import {
  Button,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  ToastAndroid,
} from "react-native";
import React from "react";
import { icons, images } from "../../constants";
import CustomButton from "../CustomButton";
import * as Clipboard from "expo-clipboard";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";

const ProfileModal = ({ handleProfileModal }) => {
  const publicAddress = "0xE6B547A4964FfC42eF171f027Ce059af5bF6772a";

  const totalStorage = 7; // in GB
  const usedStorage = 4; // in GB

  const usedPercentage = (usedStorage / totalStorage) * 100;

  const copyToClopboard = async () => {
    if (publicAddress) {
      await Clipboard.setStringAsync(publicAddress);
      // Display a success message
      if (Platform.OS === "android") {
        ToastAndroid.show("Text copied to clipboard!", ToastAndroid.SHORT);
      }
    }
  };

  return (
    <View className="p-2 w-80 bg-white rounded-2xl">
      <View className="flex flex-row items-center gap-24">
        <TouchableOpacity onPress={handleProfileModal}>
          <MaterialCommunityIcons name="window-close" size={24} color="black" />
        </TouchableOpacity>
        <Image
          source={images.logo}
          className="w-28 h-12"
          resizeMode="contain"
        />
      </View>

      <View className="bg-[#F8F9FE] p-3 rounded-2xl">
        <View className="flex flex-row gap-4">
          <Image
            source={images.profile}
            className="h-12 w-12 rounded-full"
            resizeMode="contain"
          />

          <View>
            <Text className="text-sm font-bold tracking-wider	">User</Text>
            <Text className="tracking-wide">Free Account</Text>
          </View>
        </View>

        <View className="flex  pt-4">
          <View className="flex flex-row justify-start gap-1 items-center text-sm">
            {true ? (
              <View className="flex flex-col">
                <Text className="text-sm pb-2">Public Address</Text>

                <View className="flex flex-row justify-center items-center bg-white p-1 w-full rounded-2xl cursor-pointer">
                  <Text className="text-xs mr-4">
                    {publicAddress.slice(0, 35)}..
                  </Text>
                  <Pressable onPress={copyToClopboard}>
                    <MaterialCommunityIcons
                      name="content-copy"
                      size={20}
                      color="black"
                    />
                  </Pressable>
                </View>
              </View>
            ) : (
              <TouchableOpacity
                className={`bg-violet-900 rounded-xl p-3 flex flex-row justify-center items-center`}
              >
                <Text className={`text-white font-psemibold text-base`}>
                  Connet Wallet
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <View className="border my-4 w-full  border-slate-200	" />

          <View className="flex flex-row gap-4">
            <View>
              <Feather name="upload-cloud" size={24} color="black" />
            </View>

            <View>
              <Text className="text-sm font-pmedium">Backup your data</Text>
              <Text className="text-xs tracking-wider">
                Keep your photos safe by backing in Decentralized Storage
              </Text>
            </View>
          </View>

          <View className="border my-4 w-full  border-slate-200	" />

          <View className="flex flex-row gap-4">
            <View>
              <Image
                source={images.logoSmall}
                className="w-6 h-6"
                resizeMode="contain"
              />
            </View>

            <View className="w-[80%]">
              <Text className="text-sm font-pmedium">Account Storage</Text>

              <View style={styles.progressBar}>
                <View
                  style={[styles.progressFill, { width: `${usedPercentage}%` }]}
                />
              </View>
              <Text className="text-xs">{`${usedStorage}GB out of ${totalStorage}GB used`}</Text>
            </View>
          </View>

          <TouchableOpacity className="flex justify-center items-center mt-3 ">
            <Text className="p-2 text-sm text-white font-pmedium	rounded-xl bg-[#3AC0A0]">
              Get More Storage
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <CustomButton title="View Full Profile" containerStyles="w-full mt-4" />
    </View>
  );
};

const styles = StyleSheet.create({
  progressBar: {
    height: 10,
    width: "100%",
    backgroundColor: "#e0e0e0", // Grey background for unused storage
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 5,
    marginBottom: 5,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#006FFD", // Green for used storage
    borderRadius: 10,
  },
});

export default ProfileModal;
