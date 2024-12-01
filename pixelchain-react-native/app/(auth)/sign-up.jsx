import React, { useEffect, useState } from "react";
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
import { icons, images } from "../../constants";
import { CustomButton, FormFeild } from "../../components";
import { Link, router } from "expo-router";
import * as Clipboard from "expo-clipboard";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AWS from "aws-sdk"; 

// import CryptoJS from "crypto-js";

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    accessId: "",
    secretKey: "",
    endpoint: "",
    bucketName: "",
  });

  const handleChangetext = (text, name) => {
    setForm({ ...form, [name]: text });
  };

  const submit = async () => {
    try {
      setIsSubmitting(true);

      // Configure AWS with the user's provided details
      const s3 = new AWS.S3({
        accessKeyId: form.accessId,
        secretAccessKey: form.secretKey,
        endpoint: form.endpoint,
        s3ForcePathStyle: true, // Required for custom endpoints
      });

      // Check if the bucket exists
      await s3
        .headBucket({ Bucket: form.bucketName })
        .promise()
        .then(async () => {
          // If the bucket exists, save form data and proceed
          await AsyncStorage.setItem("123", JSON.stringify(form));

          // Simulate success, then redirect
          setTimeout(() => {
            setIsSubmitting(false);
            router.replace("/sign-in");
          }, 4000);
        })
        .catch((error) => {
          console.error("Bucket verification failed:", error);
          Alert.alert(
            "Error",
            "The specified bucket does not exist or the credentials are invalid. Please check and try again."
          );
          setIsSubmitting(false);
        });
    } catch (error) {
      Alert.alert(
        "Error",
        `Error storing form data:", ${error}`
      );
     
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="w-full flex justify-center h-full px-4">
          <View className="flex justify-center items-center w-full mb-4">
            <Image
              source={images.logoSmall}
              className="w-[100px] h-[100px]"
              resizeMode="contain"
            />
          </View>

          <View>
            <Text className="text-black font-bold text-xl tracking-wider">
              Welcome!
            </Text>

            <FormFeild
              name="accessId"
              value={form.accessId}
              placeholder={"Access Id"}
              otherStyles=""
              disabled={false}
              secure={false}
              handleChangetext={handleChangetext}
            />

            <FormFeild
              name="secretKey"
              value={form.secretKey}
              placeholder={"Secret Key"}
              otherStyles=""
              disabled={false}
              handleChangetext={handleChangetext}
              secure={true}
            />

            <FormFeild
              name="endpoint"
              value={form.endpoint}
              placeholder={"Server Endpoint"}
              otherStyles=""
              disabled={false}
              handleChangetext={handleChangetext}
              secure={false}
            />

            <FormFeild
              name="bucketName"
              value={form.bucketName}
              placeholder={"Bucket Name"}
              otherStyles="mb-4"
              disabled={false}
              handleChangetext={handleChangetext}
              secure={false}
            />
          </View>

          <CustomButton
            title="Proceed >"
            handlePress={submit}
            containerStyles={""}
            isLoading={isSubmitting}
          />

          <View className="pt-2">
            <Text className="text-xs text-gray-500 font-light">
              By Clicking on Proceed you agree to our Terms and Conditions
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
