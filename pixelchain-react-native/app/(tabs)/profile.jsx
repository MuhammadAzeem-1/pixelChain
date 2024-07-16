import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { icons, images } from "../../constants";
import { Link, router } from "expo-router";
import Modal from "react-native-modal";
import ModalSetting from "../../components/modal/ModalSetting";
import AsyncStorage from '@react-native-async-storage/async-storage';



const Profile = () => {
  const [isModalVisible, setModelVisible] = useState(false);


  const logout = async () => {
    router.replace("/");
  };

  const handleModal = () => {
    setModelVisible(!isModalVisible);
  };

  return (
    <SafeAreaView className="bg-slate-100	 h-full mt-8">
      <>
        <View className="w-full flex justify-center items-center mt-6 mb-4 px-4">
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
              source={images.profile}
              className="w-[90%] h-[90%] rounded-lg"
              resizeMode="cover"
            />
          </View>

          <View className="mt-2">
            <Text className={`text-black text-center font-psemibold text-lg`}>
              Azeem
            </Text>

            <Text className="text-sm text-gray-100 text-center font-pregular">
              test@gmail.com
            </Text>
          </View>

          <View className="flex flex-row items-center py-3">
            <Text className="text-base text-red-600">Bal. </Text>
            <Text className="text-2xl text-indigo-600 font-psemibold">
              0.2 ETH
            </Text>
          </View>

          <View className="w-full bg-white	rounded-lg p-6" style={styles.boxShadows}>
            <Text className="text-xl font-bold font-pregular">Free Plan</Text>
            <Text className="text-base font-pregular mb-4">500 MB</Text>

            {true ? (
              <>
                <TouchableOpacity
                  activeOpacity={0.7}
                  className={`bg-secondary rounded-xl min-h-[42px] flex flex-row justify-center items-center`}
                >
                  <Text className={`text-primary font-psemibold text-lg`}>
                    Get more storage
                  </Text>
                </TouchableOpacity>

                <View>
                  <View className="flex flex-row py-2 justify-between items-center">
                    <Text>used storage</Text>
                    <Text>50 MB</Text>
                  </View>
                </View>
                <View className="h-2 bg-secondary mb-2"></View>
              </>
            ) : (
              <TouchableOpacity
                activeOpacity={0.7}
                className={`bg-secondary rounded-xl min-h-[62px] flex flex-row justify-center items-center`}
              >
                <Text className={`text-primary font-psemibold text-lg`}>
                  Connect Your Wallet
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View className="ml-4">
          {/*  */}

          <TouchableOpacity onPress={handleModal} className="flex flex-row items-center gap-4 mt-3 pl-4">
            <Image
              source={icons.settings}
              className="w-4 h-4"
              resizeMode="contain"
            />
            <Text className="text-lg">Settings</Text>
          </TouchableOpacity>

          {/*  */}

          <Link href="/accountinfo">
            <View className="flex flex-row items-center gap-4 mt-3">
              <Image
                source={icons.user}
                className="w-4 h-4"
                resizeMode="contain"
              />
              <Text className="text-lg">Account Info</Text>
            </View>
          </Link>

          {/*  */}

          <TouchableOpacity className="flex flex-row items-center gap-4 mt-0.5 pl-4">
            <Image
              source={icons.question}
              className="w-4 h-4"
              resizeMode="contain"
            />
            <Text className="text-lg">Help & Feedback</Text>
          </TouchableOpacity>
        </View>

        <Modal isVisible={isModalVisible} onBackdropPress={handleModal}>
          <View className="flex-1  flex justify-center items-center">
            <ModalSetting handleModal={handleModal}/>
          </View>
        </Modal>
      </>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  boxShadows: {
    shadowColor: "rgba(0, 0, 0, 0.16)",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.16,
    shadowRadius: 4,
    elevation: 6, // Adjust as needed for Android
  },
});
