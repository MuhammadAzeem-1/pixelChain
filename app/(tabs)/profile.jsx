import React from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import InfoBox from "../../components/InfoBox";
import { icons, images } from "../../constants";
import { router } from "expo-router";
import Header from "../../components/Header";

const Profile = () => {

  const logout = async () => {
    router.replace("/sign-in");
  };

  return (
    <SafeAreaView className="bg-primary h-full mt-8">
      <>
        <View className="mt-2">
          <Header />
        </View>

        <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
          <TouchableOpacity
            onPress={logout}
            className="flex w-full items-end mb-10"
          >
            <Image
              source={icons.logout}
              resizeMode="contain"
              className="w-6 h-6"
            />
          </TouchableOpacity>

          <View className="w-16 h-16 border border-secondary rounded-lg flex justify-center items-center">
            <Image
              source={ images.profile }
              className="w-[90%] h-[90%] rounded-lg"
              resizeMode="cover"
            />
          </View>

          <InfoBox
            title="Azeem"
            containerStyles="mt-5"
            titleStyles="text-lg"
          />

          <View className="mt-5 flex flex-row">
            <InfoBox
              title="3"
              subtitle="Posts"
              titleStyles="text-xl"
              containerStyles="mr-10"
            />

            <InfoBox title="1.2k" subtitle="Followers" titleStyles="text-xl" />
          </View>
        </View>
      </>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({});
