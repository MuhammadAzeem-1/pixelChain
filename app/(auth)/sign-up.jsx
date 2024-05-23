import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Dimensions,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import { CustomButton, FormFeild } from "../../components";
import { Link, router } from "expo-router";

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const submit = async () => {
      router.replace("/photos")
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4 my-6"
          style={{ minHeight: Dimensions.get("window").height - 100 }}
        >
          <View className="flex justify-center items-center">
            <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[150px] h-[54px]"
          />
          </View>
          

          <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
            Signup to Aora
          </Text>

          <FormFeild
            title="username"
            value={form.username}
            handleChangetext={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
          />

          <FormFeild
            title="Email"
            value={form.email}
            handleChangetext={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
          />

          <FormFeild
            title="Password"
            value={form.password}
            handleChangetext={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles={"mt-7"}
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
            </Text>

            <Link
              href="/sign-in"
              className="text-lg font-psemibold text-secondary"
            >
              Login
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
