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
import AsyncStorage from "@react-native-async-storage/async-storage";
import AWS from "aws-sdk";
import * as SecureStore from "expo-secure-store";


const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBucketName, setIsBucketName] = useState(false);
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
      router.replace("/sign-in")
      // setIsSubmitting(true);

      // // Configure AWS with the user's provided details
      // const s3 = new AWS.S3({
      //   accessKeyId: form.accessId,
      //   secretAccessKey: form.secretKey,
      //   endpoint: form.endpoint,
      //   s3ForcePathStyle: true, // Required for custom endpoints
      //   signatureVersion: "v4",
      // });

      // // Check if the bucket exists

      // const bucketName = form.bucketName;
      // await s3
      //   .headBucket({ Bucket: bucketName })
      //   .promise()
      //   .then(async () => {
      //     // If the bucket exists, save form data and proceed
      //     // await AsyncStorage.setItem(
      //     //   "123",
      //     //   JSON.stringify({
      //     //     bucketName: form.bucketName,
      //     //     accessId: form.accessId,
      //     //     secretKey: form.secretKey,
      //     //     endpoint: form.endpoint,
      //     //   })
      //     // );

      //     await SecureStore.setItemAsync(
      //       "123",
      //       JSON.stringify({
      //         bucketName: form.bucketName,
      //         accessId: form.accessId,
      //         secretKey: form.secretKey,
      //         endpoint: form.endpoint,
      //       })
      //     );

      //     // Simulate success, then redirect
      //     setTimeout(() => {
      //       setIsSubmitting(false);
      //       router.replace("/sign-in"); // Uncomment if using a router
      //     }, 2000);
      //   })
      //   .catch((error) => {
      //     console.error("Bucket verification failed:", error);
      //     Alert.alert(
      //       "Error",
      //       "The specified bucket does not exist or the credentials are invalid. Please check and try again."
      //     );
      //     setIsSubmitting(false);
      //   });
    } catch (error) {
      Alert.alert("Error", `Error storing form data: ${error}`);
      setIsSubmitting(false);
    }
  };

  const handleProceed = () => {
    // Validate that all fields are filled before proceeding
    const { accessId, secretKey, endpoint } = form;
    if (!accessId || !secretKey || !endpoint) {
      Alert.alert("Error", "Please fill all the fields.");
      return;
    }
    setIsBucketName(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.formContainer}>
          {!isBucketName ? (
            <View style={styles.innerContainer}>
              <View style={styles.logoContainer}>
                <Image
                  source={images.logoSmall} // Update with your logo path
                  style={styles.logo}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.welcomeText}>Welcome!</Text>

              <FormFeild
                name="accessId"
                value={form.accessId}
                placeholder="Access Id"
                handleChangetext={handleChangetext}
                secure={false}
              />
              <FormFeild
                name="secretKey"
                value={form.secretKey}
                placeholder="Secret Key"
                handleChangetext={handleChangetext}
                secure={true}
              />
              <FormFeild
                name="endpoint"
                value={form.endpoint}
                placeholder="Server Endpoint"
                handleChangetext={handleChangetext}
                secure={false}
              />

              <CustomButton
                title="Proceed >"
                handlePress={handleProceed}
                isLoading={isSubmitting}
                containerStyles={"mt-4"}
              />

              <View style={styles.termsContainer}>
                <Text style={styles.termsText}>
                  By Clicking on Proceed you agree to our Terms and Conditions
                </Text>
              </View>
            </View>
          ) : (
            <View style={styles.innerContainer}>
              <FormFeild
                name="bucketName"
                value={form.bucketName}
                placeholder="Bucket Name"
                handleChangetext={handleChangetext}
                secure={false}
              />
              <CustomButton
                title="Access Bucket"
                handlePress={submit}
                isLoading={isSubmitting}
                containerStyles={"mt-6"}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    width: "100%",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  logo: {
    width: 100,
    height: 100,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  termsContainer: {
    marginTop: 16,
  },
  termsText: {
    fontSize: 12,
    color: "gray",
    textAlign: "center",
  },
});

export default SignUp;
