import { View, Text, TouchableOpacity , ScrollView, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import {  router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";

const projectId = 'e513dba993263d9dd590cdb6aeb4584f'


export default function App() {
  // if (!isLoading && isLogged) return <Redirect href="/home" />;

  const handlePressButton = () =>{

  }

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
            title="Continue with email"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-7"
          />

          <TouchableOpacity
            onPress={handlePressButton}
            activeOpacity={0.7}
            className={`bg-violet-900	 rounded-xl min-h-[62px] flex flex-row justify-center items-center w-full mt-7`}
          >
            <Text
              className={`text-white font-psemibold text-lg`}
            >
              Connect Wallet
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}
