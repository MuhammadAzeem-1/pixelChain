import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  ToastAndroid,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../../constants";
import { CustomButton, FormFeild } from "../../components";
import { Link, router } from "expo-router";
import * as Clipboard from "expo-clipboard";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isKeyCopied, setIsKeyCopied] = useState(false);
  const [form, setForm] = useState({
    key: "",
    address: "",
  });

  const submit = async () => {
    if (!isKeyCopied) {
      Alert.alert("Warning", "Please Copy The keys Before Proceeding");
      return;
    }
    router.replace("/sign-in");
  };

  const copyToClopboard = async () => {
    if (form) {
      console.log("copying to clipboard", form.key);
      await Clipboard.setStringAsync("hello world");
      setIsKeyCopied(true);
      // Display a success message
      if (Platform.OS === "android") {
        ToastAndroid.show("Text copied to clipboard!", ToastAndroid.SHORT);
      }
    }
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="w-full justify-center h-full px-4 my-1">
          <View>
            <Text className="text-base font-semibold tracking-widest  text-black mt-2">
              Secure Account Creation
            </Text>
          </View>

          <View className="flex justify-center items-center text-center mt-10">
            <Text className="text-sm text-center font-light text-orange-400		">
              Your
              <Text className="font-medium capitalize">
                {" "}
                private Key
              </Text> and{" "}
              <Text className="font-medium capitalize"> Public Key</Text> have
              been securely generated.
            </Text>
          </View>

          <FormFeild
            title="Private Key"
            value={form.key}
            placeholder={"Generated Private Key"}
            otherStyles="mt-10"
            disabled={true}
            s
            secure={false}
          />

          <FormFeild
            title="Public Key"
            value={form.address}
            placeholder={"Generated Public Address"}
            otherStyles="mt-7"
            disabled={true}
            secure={true}
          />

          <TouchableOpacity
            className="bg-[#3AC0A0] border border-white rounded-xl min-h-[55px] flex flex-row justify-center items-center  mt-12"
            onPress={copyToClopboard}
          >
            {isKeyCopied ? (
              <AntDesign name="check" size={15} color="white" />
            ) : (
              <MaterialIcons name="content-copy" size={15} color="white" />
            )}
            <Text className="text-white font-pmedium text-base pl-5 tracking-wider	">
              Copy Keys
            </Text>
          </TouchableOpacity>

          <View className="flex flex-row items-center gap-1 mt-7">
            <View className="p-4 bg-[#E86339] rounded-full">
              <MaterialIcons name="error-outline" size={24} color="black" />
            </View>

            <View className="w-60 pl-2  ">
              <Text className="text-[#FFB37C] text-sm font-normal">
                Keep your Private Key secure. It’s your sole access to your
                account.
              </Text>
              <Text className="text-[#FFB37C] text-sm font-medium ">
                Do not share it with anyone.
              </Text>
            </View>
          </View>

          <CustomButton
            title="Proceed to Next Step."
            handlePress={submit}
            containerStyles={"mt-7"}
            isLoading={isSubmitting}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
