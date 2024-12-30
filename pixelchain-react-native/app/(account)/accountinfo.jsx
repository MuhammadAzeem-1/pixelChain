import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Dimensions,
  Image,
  Alert,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "../../constants";
import { CustomButton, FormFeild } from "../../components";
import { Link, router } from "expo-router";
import TextBox from "../../components/TextBox";
import * as SecureStore from "expo-secure-store";
import { getCredentials } from "../../lib/Helper";

const SignUp = () => {
  const [form, setForm] = useState({
    UserName: "",
    accessId: "",
    secretKey: "",
    endpoint: "",
    bucketName: "",
  });

  const handlePress = async () => {
    await AsyncStorage.setItem("123", JSON.stringify(form));
  };

  const getData = async (key) => {
    try {
      const data = await AsyncStorage.getItem(key);
      if (data !== null) {
        // The value exists
        console.log("Retrieved value:", data);
        return JSON.parse(data); // Parse if you stored JSON
      } else {
        console.log("No value found for the key:", key);
        return null;
      }
    } catch (error) {
      console.error("Error retrieving data:", error);
      return null;
    }
  };

  const getUserInfo = async () => {
    const data = await getCredentials("123");
    setForm({
      accessId: data.accessId,
      secretKey: data.secretKey,
      endpoint: data.endpoint,
      bucketName: data.bucketName,
    });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <SafeAreaView className="bg-violet-900		 h-full">
      <ScrollView>
        <TouchableOpacity className="h-24 p-2" onPress={() => router.push("/photos")}>
          <Image
            source={icons.arrow2}
            className="w-6 h-6 "
            resizeMode="contain"
          />
        </TouchableOpacity>

        <View className="bg-white h-full w-full rounded-t-3xl p-4">
          <View>
            <Text className="text-2xl font-pregular font-bold">
              Account Info
            </Text>
          </View>

          <View className="mt-8">
            <TextBox
              placeholder={"UserName"}
              value={form.UserName}
              editable={true}
              Label={"User"}
            />

            <TextBox
              placeholder={"Bucket Name"}
              value={form.bucketName}
              editable={false}
              Label={"Bucket Name"}
            />

            <TextBox
              placeholder={"Access Id"}
              value={form.accessId}
              password={false}
              editable={false}
              Label={"Access Id"}
            />
            {/* <View className="w-full h-12 px-4 bg-gray-200	 rounded-2xl border-2 border-gray-200 focus:border-secondary flex flex-row items-center mt-8">
              <TextInput
                className="flex-1 text-primary font-psemibold text-base"
                value=""
                placeholder="userName"
                placeholderTextColor="#7B&B8B"
                
              />
              <Image
                source={icons.copy}
                resizeMode="contain"
                className="w-4 h-4"
              />
            </View> */}

            <TextBox
              placeholder={"Secret Key"}
              value={form.secretKey}
              password={false}
              Label={"Secret Key"}
            />

            <TextBox
              placeholder={"EndPoint"}
              value={form.endpoint}
              editable={true}
              Label={"EndPoint"}
            />

            <View className="flex justify-end items-end mt-8 mb-32">
              <CustomButton
                title={"Save"}
                containerStyles={"w-44 min-h-[44px] my-4"}
                handlePress={handlePress}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
