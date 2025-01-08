import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { icons, images } from "../../constants";
import Header from "../../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import Modal from "react-native-modal";
import ModalSetting from "../../components/modal/ModalSetting";

const create = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [isModalVisible, setModelVisible] = useState(false);

  const handleModal = () => {
    setModelVisible(!isModalVisible);
  };

  const submit = () => {};

  const onRefresh = async () => {};

  const handleButtonMeta = [
    {
      key: "1",
      icon: icons.star2,
      title: "Favorites",
    },
    {
      key: "2",
      icon: icons.trash,
      title: "Trash",
    },
    {
      key: "3",
      icon: icons.clock,
      title: "Recently Added",
    },
    {
      key: "4",
      icon: icons.video,
      title: "Videos",
    },
  ];

  return (
    <SafeAreaView className="bg-white h-full">
      <Header />

      <View className="flex items-center">
        {/* <View className="flex flex-row items-center h-[150px] justify-center gap-4 mx-4">
          <TouchableOpacity
            className="flex-row items-center justify-evenly w-[120px] py-4 bg-blue-100 rounded-xl"
            onPress={() => {}}
          >
            <Image source={icons.star2} className="w-[15px] h-[15px]" />
            <Text className="text-[14px] font-base text-gray-800">
              Favorites
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center justify-evenly w-[120px] py-4 bg-blue-100 rounded-xl"
            onPress={() => {}}
          >
            <Image source={icons.trash} className="w-[15px] h-[15px]" />
            <Text className="text-[14px] font-base text-gray-800">Trash</Text>
          </TouchableOpacity>
        </View> */}

        <TouchableOpacity
          className="flex-row justify-center items-center gap-4 w-full mt-8"
          onPress={() => router.push("/uploadimages")}
        >
          <View className="flex justify-center items-center w-[90%] h-32 border border-dashed border-[#6FBAFF] bg-[#EAF2FF]">
            <Feather name="upload" size={24} color="#D4D6DD" />

            <Text className="text-[#6FBAFF] text-base font-meedium">
              Upload File
            </Text>
          </View>
        </TouchableOpacity>

      </View>

      <View className="ml-4">
          {/*  */}

          <TouchableOpacity
            onPress={handleModal}
            className="flex flex-row items-center gap-4 mt-3 pl-4"
          >
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
            <ModalSetting handleModal={handleModal} />
          </View>
        </Modal>
    </SafeAreaView>
  );
};

export default create;

const styles = StyleSheet.create({});
{
  /* <View className="flex-row items-center justify-between mx-4">
          <Text className="text-[18px] font-pmedium text-gray-700">Photos on device</Text>
          <TouchableOpacity onPress={() => {}}>
            <Text className="text-[18px] font-pmedium text-[#3993BF]">
              View All
            </Text>
          </TouchableOpacity>
        </View> */
}

{
  /* <View className="h-fit">
          <FlatList
            data={[{ id: "1" }, { id: "2" }, { id: "3" }]}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ flexGrow: 1 }}

            ListHeaderComponent={() => (
              <View className="flex my-4 px-4 space-y-4">
                  <Folders data={data} />
              </View>
            )}
            
            ListEmptyComponent={() => (
              <EmptyState
                title="Permission Required"
                subtitle="No Permissions"
              />
            )}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </View> */
}

{
  /* Albmus */
}
{
  /* <View className="flex-row items-center justify-between mx-4">
          <Text className="text-[18px] font-pmedium text-[#3993BF]">Recent Photo</Text>
          <Text className="text-[18px] font-pmedium text-gray-700">Albums</Text>
        </View>

        <View  style={{ flex: 1 }} className="w-[100%]">  
            <FlatList 
              data={[{ id: "1" }, { id: "2" }, { id: "3" }]}
              keyExtractor={(item) => item.id}

              ListHeaderComponent={() => (
                <View className="flex my-4 px-4 space-y-4">
                    <Albums data={NewAlbumdata} />
                </View>
              )}

              ListEmptyComponent={() => (
                <EmptyState
                  title="No Albums"
                  subtitle="No Albums"
                />
              )}

              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
        </View>
        
         <View className="flex-row justify-center gap-4 ">
        <View>
          <View className="h-[150px] bg-[#f0f1f2] w-40 p-2 rounded-xl m-2 flex-row flex-wrap justify-center items-center ">
            {[1, 2, 3, 4].map((item) => {
              return (
                <View key={item} className=" flex-row flex-wrap">
                  <Image
                    source={images.profile}
                    className="w-12 h-12 rounded-full m-2"
                  />
                </View>
              );
            })}
          </View>

          <Text className="ml-4 text-base font-medium">Albums</Text>
        </View>

        <View>
          <TouchableOpacity
            onPress={() => router.push("/uploadimages")}
            className="h-[150px] bg-[#f0f1f2] w-40 p-2 rounded-xl m-2 flex-row flex-wrap justify-center items-center"
          >
            {[1, 2, 3, 4].map((item) => {
              return (
                <View key={item} className=" flex-row flex-wrap">
                  <Image
                    source={images.profile}
                    className="w-12 h-12 rounded-full m-2"
                  />
                </View>
              );
            })}
          </TouchableOpacity>

          <Text className="ml-4 text-base font-medium">On this device</Text>
        </View>
      </View>
        
        
        
        */
}
