import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import CustomButton from "../CustomButton";

const ModalSetting = () => {
  return (
    <View className="bg-white rounded-xl p-4 w-full">
      <View className="flex justify-center items-center">
        <Text className="text-base font-pregular font-bold tracking-wider">Settings</Text>
      </View>

      <View className="flex justify-center items-center">
        <View className=" mt-4 flex flex-row justify-around bg-gray-100 w-60 rounded-2xl">
          <TouchableOpacity className="shadow-lg shadow-gray-600 bg-white w-[50%] flex items-center rounded-2xl p-2">
            <Text >Light</Text>
          </TouchableOpacity>

          <TouchableOpacity className="w-[50%] flex items-center rounded-2xl p-2">
            <Text>Dark</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex items-center mt-4">
        <CustomButton 
           title="Delete Account"
           containerStyles="min-h-[44px] bg-red-700 w-[60%]"
           textStyles="text-white"
        />
      </View>
    </View>
  );
};

export default ModalSetting;

const styles = StyleSheet.create({
    boxShadows: {
      shadowColor: 'rgba(0, 0, 0, 0.16)',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.16,
      shadowRadius: 4,
      elevation: 2, // for Android
    },
  });