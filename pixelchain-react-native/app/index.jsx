import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  useEffect(() => {
    const fetchStoredPasscode = async () => {
      const savedPasscode = await AsyncStorage.getItem("passcode");

      if (savedPasscode) {
        console.log(savedPasscode);
        router.push("/photos");
      }
    };
    fetchStoredPasscode();
  }, []);
  // if (!isLoading && isLogged) return <Redirect href="/home" />;

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full flex justify-center items-center h-full px-4">
          <Image
            source={images.logo}
            className="w-[200px] h-[100px]"
            resizeMode="contain"
          />

          <Image
            source={images.cards}
            className="max-w-[350px] w-full h-[248px]"
            resizeMode="contain"
          />

          <View className="relative mt-5">
            <Text className="text-2xl text-white font-bold text-center">
              Discover Endless {"\n"}
              Possibilities with{" "}
              <Text className="text-secondary-200">PixelChain</Text>
            </Text>

            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode="contain"
            />
          </View>

          <CustomButton
            title="Continue"
            handlePress={() => router.push("/sign-up")}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}
