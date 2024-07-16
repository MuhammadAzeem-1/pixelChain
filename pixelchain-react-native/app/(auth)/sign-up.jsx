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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../../constants";
import { CustomButton, FormFeild } from "../../components";
import { Link, router } from "expo-router";
import * as Clipboard from "expo-clipboard";

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    key: "asdasdasdasfgs654",
    address: "654fsdfsd65fsdfg1sd",
  });

  const submit = async () => {
    router.replace("/sign-in");
  };

  const copyToClopboard = async () => {
    if (form) {
      console.log("copying to clipboard", form.key);
      await Clipboard.setStringAsync("hello world");

      // Display a success message
      if (Platform.OS === "android") {
        ToastAndroid.show("Text copied to clipboard!", ToastAndroid.SHORT);
      }
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center h-full px-4 my-1">
          <TouchableOpacity>
            <Image
              source={icons.arrow2}
              className="w-6 h-6 "
              resizeMode="contain"
            />
          </TouchableOpacity>

          <View className="flex flex-row  justify-center items-center">
            <Text className="text-2xl font-light tracking-widest  text-white mt-2">
              Create Account
            </Text>
          </View>

          <View className="flex justify-center items-center text-center mt-10">
            <Text className="text-xl text-center font-medium text-orange-400		">
              We've just generated a private Key and address for you.
            </Text>
          </View>

          <FormFeild
            title="Private Key"
            value={form.key}
            handleChangetext={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            disabled={false}
          />

          <FormFeild
            title="Address"
            value={form.address}
            handleChangetext={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            disabled={false}
          />

          <TouchableOpacity
            className="bg-indigo-800 border border-white rounded-xl min-h-[62px] flex flex-row justify-center items-center mt-7"
            onPress={copyToClopboard}
          >
            <Image
              source={icons.copy}
              className="w-6 h-6"
              resizeMode="contains"
            />
            <Text className="text-white font-psemibold text-lg pl-2">
              Copy Private Key
            </Text>
          </TouchableOpacity>

          <View className="flex flex-row items-center gap-1 mt-7">
            <View className="p-4 bg-secondary rounded-full">
              <Image
                source={icons.problem}
                className="w-6 h-6"
                resizeMode="contains"
              />
            </View>
            <Text className="text-white font-light text-base pl-2 w-60">
              Make sure to keep your private key safe. It is the only way to
              access your account.
            </Text>
          </View>

          <CustomButton
            title="Next"
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
