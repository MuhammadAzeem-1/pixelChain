import {
  Image,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  RefreshControl,
  View,
} from "react-native";
import React, { useState } from "react";
import { icons, images } from "../../constants";
import { data, NewAlbumdata } from "../../constants/data";
import Folders from "../../components/Folders";
import Albums from "../../components/Albums";
import Header from "../../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import Feather from "@expo/vector-icons/Feather";

const create = () => {
  const [refreshing, setRefreshing] = useState(false);

  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });

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
        <View className="flex flex-row items-center h-[150px] justify-center gap-4 mx-4">
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
        </View>

        <TouchableOpacity
          className="flex-row justify-center items-center gap-4 w-full"
          onPress={() => router.push("/uploadimages")}
        >
          <View className="flex justify-center items-center w-[90%] h-32 border border-dashed border-[#6FBAFF] bg-[#EAF2FF]">
            <Feather name="upload" size={24} color="#D4D6DD" />

            <Text className="text-[#6FBAFF] text-base font-meedium">
              Upload File
            </Text>
          </View>
        </TouchableOpacity>

        <View className="mt-8 w-full">
          {handleButtonMeta.map((item) => {
            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => {}}
                className="flex-row justify-start items-center gap-4 border-b-[1px] border-gray-100 p-2 ml-4"
              >
                <Image source={item.icon} className="w-8 h-8" />
                <Text>{item.title}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
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
