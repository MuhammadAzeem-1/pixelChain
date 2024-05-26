import React, { useState } from "react";
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

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  return (
    <SafeAreaView className="bg-violet-900		 h-full">
      <ScrollView>
        <TouchableOpacity className="h-24 p-2">
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
            <Text className="text-base">To update and view account info</Text>
          </View>

          <Image
            source={images.profile}
            className="w-20 h-20 rounded-full mt-4"
            resizeMode="contain"
          />

          <View>

          <TextBox
              placeholder={"wallet Id"}
              value="0x53461267215+9626465"
              password={false}
              editable={false}
              isWallet={true}
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

            <TextBox placeholder={"username"} value="" />

            <TextBox
              placeholder={"Email"}
              value="text@gmail.com"
              editable={false}
            />

            <TextBox
              placeholder={"current password"}
              value=""
              editable={true}
              password={true}
            />

            <View className="flex justify-end items-end mt-8 mb-32">
              <CustomButton
                title={"Save"}
                containerStyles={"w-44 min-h-[44px] my-4"}
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
